/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { BsFillTrashFill, BsCloudUpload } from "react-icons/bs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 3;

const FileUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", bg: "" });

  const showToast = (message, bg) => {
    setToast({ show: true, message, bg });
  };

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      // Check for file type errors
      const typeError = fileRejections.some((rejection) =>
        rejection.errors.some((e) => e.code === "file-invalid-type")
      );
      if (typeError) {
        showToast("Only Excel files are allowed", "danger");
        return;
      }

      // Check for file size errors
      const sizeError = fileRejections.some((rejection) =>
        rejection.errors.some((e) => e.code === "file-too-large")
      );
      if (sizeError) {
        showToast(
          `Files must be smaller than ${MAX_FILE_SIZE / 1024 / 1024} MB`,
          "danger"
        );
        return;
      }

      // Check total file count
      if (files.length + acceptedFiles.length > MAX_FILES) {
        showToast(`Maximum ${MAX_FILES} files allowed`, "warning");
        return;
      }

      // Process valid files
      const uploadedFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles((prev) => [...prev, ...uploadedFiles]);
      if (onFileUpload) onFileUpload([...files, ...uploadedFiles]);

      showToast("File(s) uploaded successfully", "success");
    },
    [onFileUpload, files]
  );

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
      "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
    },
    multiple: true,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div className="file-upload-container">
      <ToastContainer className="p-3" position="middle-center">
        {toast.show && (
          <Toast
            onClose={() => setToast({ ...toast, show: false })}
            show={toast.show}
            delay={3000}
            autohide
            bg={toast.bg}
          >
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <BsCloudUpload size={40} />
        <p>Click or drag files here to upload!</p>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <h3>Uploaded File(s)</h3>
          <ul>
            {files.map((file) => (
              <li key={file.name} className="file-item">
                <span>{file.name}</span>
                <Button
                  className="delete-btn"
                  onClick={() => removeFile(file.name)}
                >
                  <BsFillTrashFill />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
