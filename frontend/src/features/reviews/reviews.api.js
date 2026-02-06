// review.api.js
import httpClient from "../../services/httpClient";

export const getMyReviewApi = () =>
  httpClient.get("/api/reviews/my");

export const submitSelfReviewApi = (id, comments) =>
  httpClient.post(`/api/reviews/${id}/self`, { comments });


export const getTeamReviewsApi = () =>
  httpClient.get("/api/reviews/team");

export const submitManagerReviewApi = (id, comments) =>
  httpClient.post(`/api/reviews/${id}/manager`, { comments });

