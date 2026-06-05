import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiscographyPage from "./pages/DiscographyPage";
import AdminMessagesPage from "./pages/AdminMessagesPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/discografia" element={<DiscographyPage />} />
          <Route path="/admin/messaggi" element={<AdminMessagesPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
