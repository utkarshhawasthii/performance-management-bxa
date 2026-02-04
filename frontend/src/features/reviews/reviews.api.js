import httpClient from "../../services/httpClient";

export const submitSelfReviewApi = (id, payload) =>
  httpClient.post(`/api/reviews/${id}/self`, payload);

export const submitManagerReviewApi = (id, payload) =>
  httpClient.post(`/api/reviews/${id}/manager`, payload);

export const getManagerReviewsApi = (page = 0, size = 10) =>
  httpClient.get(`/api/reviews/manager?page=${page}&size=${size}`);
