import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SelectResume from "./pages/SelectResume";
import { ToastContainer } from "react-toastify";
import AnalysisDetail from "./pages/analysisDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-resume" element={<SelectResume />} />
          <Route path="/analysis-result" element={<AnalysisDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
