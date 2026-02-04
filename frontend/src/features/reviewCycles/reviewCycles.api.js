import httpClient from "../../services/httpClient";

export const createReviewCycleApi = (payload) =>
  httpClient.post("/api/review-cycles", payload);

export const activateReviewCycleApi = (id) =>
  httpClient.post(`/api/review-cycles/${id}/activate`);

export const closeReviewCycleApi = (id) =>
  httpClient.post(`/api/review-cycles/${id}/close`);

export const getReviewCyclesApi = () =>
  httpClient.get("/api/review-cycles");
