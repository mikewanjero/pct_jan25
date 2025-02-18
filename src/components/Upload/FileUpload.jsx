/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { BsFillTrashFill, BsCloudUpload } from "react-icons/bs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 3;

const FileUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  // Dropped files
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Check if the files exceed the maximum limit
      if (files.length + acceptedFiles.length > MAX_FILES) {
        showToast(`You can only upload ${MAX_FILES} files`, "error");
        return;
      }

      // Check if the files exceed the maximum size
      const validFiles = acceptedFiles.filter(
        (file) => file.size <= MAX_FILE_SIZE
      );

      // Check if the files exceed the maximum size
      if (acceptedFiles.length !== validFiles.length) {
        showToast(
          `One or more files exceed the maximum size of ${
            MAX_FILE_SIZE / 1024 / 1024
          }MB`,
          "error"
        );
      }

      // Check if file is the right type
      const invalidFileType = acceptedFiles.some(
        (file) => !file.name.endsWith(".xlsx")
      );
      if (invalidFileType) {
        showToast("Only Excel files are allowed", "error");
        return;
      }

      // Success message for valid files
      showToast("Files uploaded successfully.", "success");

      // Add mew file
      const uploadedFiles = validFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]); // Update files state
      if (onFileUpload) onFileUpload([...files, ...uploadedFiles]); // Call the parent function
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
    accept: ".xlsx", // Only Excel files to be uploaded
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
            className={`toast ${toast.type}`} // Toast type: error, success, warning, info
          >
            <Toast.Body>{toast.message}</Toast.Body>
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
