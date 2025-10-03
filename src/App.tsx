import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SelectResume from "./pages/SelectResume";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-resume" element={<SelectResume />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
