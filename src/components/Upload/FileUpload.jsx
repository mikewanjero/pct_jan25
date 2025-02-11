/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import { BsFillTrashFill, BsCloudUpload } from "react-icons/bs";

const FileUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);

  // Dropped files
  const onDrop = useCallback(
    (acceptedFiles) => {
      const uploadedFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      if (onFileUpload) onFileUpload(uploadedFiles);
    },
    [onFileUpload]
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
  });

  return (
    <div className="file-upload-container">
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
