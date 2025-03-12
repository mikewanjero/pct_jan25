import { useState } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).slice(0, 3); // Limit to 3 files
    setFiles(uploadedFiles);
    onFileUpload(uploadedFiles);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
FileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUpload;
