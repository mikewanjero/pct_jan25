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
  const simulateUpload = () => {
    console.log("Uploading files: ", files);
    alert("Files uploaded successfully");
  };

  // File Types to Upload
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*, application/pdf",
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
        <div className="file-preview">
          {files.map((file) => (
            <div className="file-item" key={file.name}>
              <span>{file.name}</span>
              <button
                onClick={() => removeFile(file.name)}
                className="delete-btn"
              >
                <BsFillTrashFill />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button*/}
      {files.length > 0 && (
        <Button onClick={simulateUpload} className="upload-btn">
          Upload Files
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
