import { useState } from "react";
import { useParams } from "react-router-dom";
import { submitActActivation } from "../services/api";

const useActActivation = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    masterDocs: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (files) => {
    setFormData((prev) => ({ ...prev, masterDocs: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitActActivation(id, formData);
      alert("Submission successful!");
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleFileUpload, handleSubmit, loading };
};

export default useActActivation;
