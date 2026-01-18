import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/quiz/",
});

export const fetchQuizzes = () => api.get("/");
export const fetchQuizDetail = (quizId) => api.get(`/${quizId}/`);
export const submitQuiz = (quizId, payload) =>
  api.post(`/${quizId}/submit/`, payload);
