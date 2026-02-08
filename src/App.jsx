import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import COIDetail from "./pages/COIDetail";
import COIEdit from "./pages/COIEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coi/:id" element={<COIDetail />} />
          <Route path="/coi/:id/edit" element={<COIEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
