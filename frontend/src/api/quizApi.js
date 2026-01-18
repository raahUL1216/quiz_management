import axios from "axios";

// Vite exposes env variables via import.meta.env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchQuizzes = () => api.get("/");
export const fetchQuizDetail = (quizId) => api.get(`/${quizId}/`);
export const submitQuiz = (quizId, payload) =>
  api.post(`/${quizId}/submit/`, payload);
