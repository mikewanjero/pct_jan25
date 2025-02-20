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

  // Dropped files
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Check if the files exceed the maximum limit
      if (files.length + acceptedFiles.length > MAX_FILES) {
        showToast(`You can only upload up to ${MAX_FILES} files`, "warning");
        return;
      }

      // Function to check if the files exceed the maximum size
      const validFiles = acceptedFiles.filter(
        (file) => file.size <= MAX_FILE_SIZE
      );

      // Check if the files exceed the maximum size
      if (acceptedFiles.length !== validFiles.length) {
        showToast(
          `One or more files exceed the maximum size of ${
            MAX_FILE_SIZE / 1024 / 1024
          }MB`,
          "danger"
        );
        return;
      }

      // Check if file is the right type
      const invalidFileType = acceptedFiles.some(
        (file) =>
          ![".xlsx", ".xls", ".csv", ".ods"].some((ext) =>
            file.name.toLowerCase().endsWith(ext)
          ) // Check if the file type is not allowed
      );
      if (invalidFileType) {
        showToast("Only Excel files are allowed", "danger");
        return;
      }

      // If the file is valid, add the file to upload box
      if (validFiles.length > 0) {
        const uploadedFiles = validFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]); // Update files state
        if (onFileUpload) onFileUpload([...files, ...uploadedFiles]); // Call the parent function

        // Success message for valid files
        showToast("File(s) uploaded successfully.", "success");
      }
    },
    [onFileUpload, files] // Dependencies
  );

  // Removing a file
  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  // Simulating file(s) upload
  // const simulateUpload = () => {
  //   console.log("Uploading files: ", files);
  //   alert("Files uploaded successfully");
  // };

  // File Types to Upload
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ], // Excel 2007-2025
      "application/vnd.ms-excel": [".xls"], // Excel 97-2003
      "application/csv": [".csv"], // Comma-separated values
      "text/csv": [".csv"], // Comma-separated values
      "application/vnd.oasis.opendocument.spreadsheet": [".ods"], // OpenDocument Spreadsheet
    },
    multiple: true,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div className="file-upload-container">
      {/* Toast Notification */}
      <ToastContainer className="toast-container p-3" position="middle-center">
        {/* Show the toast message */}
        {toast.show && (
          <Toast
            onClose={() => setToast({ ...toast, show: false })} // Close the toast message
            show={toast.show} // Show the toast message
            delay={3000} // Delay of 3 seconds
            autohide // Hide the toast message automatically
            bg={toast.bg} // Toast background color
          >
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* Drag and Drop Zone */}
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <BsCloudUpload size={40} />
        <p>Click or drag files here to upload!</p>
      </div>

      {/* Displaying uploaded files*/}
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
