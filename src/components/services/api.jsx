export const submitActActivation = async (id, data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);

  data.masterDocs.forEach((file) => {
    formData.append("masterDocs", file);
  });

  const response = await fetch(`/api/act-activation/${id}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit data");
  }

  return response.json();
};
