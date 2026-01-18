import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizListPage from "./pages/QuizListPage";
import QuizTakePage from "./pages/QuizTakePage";
import QuizResultPage from "./pages/QuizResultPage";

import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<QuizListPage />} />
          <Route path="/quiz/:quizId" element={<QuizTakePage />} />
          <Route path="/quiz/:quizId/result" element={<QuizResultPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
