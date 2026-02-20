const BASE_URL = "http://localhost:8080/api/shapes";

export const createShape = async (shape) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shape),
  });
  return res.json();
};

export const updateShape = async (id, shape) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shape),
  });
  return res.json();
};

export const getShape = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const getShapes = async () => {
  const res = await fetch(BASE_URL);

  const data = await res.json();

  console.log("Fetched shapes:", data);
  return data;
};

export const deleteShape = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();
  return data;
};
