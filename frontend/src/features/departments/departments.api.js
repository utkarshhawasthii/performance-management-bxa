import httpClient from "../../services/httpClient";

export const getDepartmentsApi = () => {
  return httpClient.get("/api/departments");
};

export const createDepartmentApi = (payload) => {
  return httpClient.post("/api/departments", payload);
};

export const updateDepartmentApi = (id, payload) => {
  return httpClient.put(`/api/departments/${id}`, payload);
};

export const deleteDepartmentApi = (id) => {
  return httpClient.delete(`/api/departments/${id}`);
};
