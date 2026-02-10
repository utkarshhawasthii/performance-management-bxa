import httpClient from "../services/httpClient";

export const loginApi = (payload) => {
  return httpClient.post("/api/auth/login", payload);
};

export const getMeApi = () => {
  return httpClient.get("/api/auth/me");
};

export const updateMeApi = (payload) => {
  return httpClient.put("/api/auth/me", payload);
};
