import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { TaleplerPage } from "./pages/TaleplerPage";
import { ZafiyetlerPage } from "./pages/ZafiyetlerPage";
import { ProblemlerPage } from "./pages/ProblemlerPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/talepler" replace />} />
        <Route path="talepler" element={<TaleplerPage userName="Selim" />} />
        <Route path="zafiyetler" element={<ZafiyetlerPage />} />
        <Route path="problemler" element={<ProblemlerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}