import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

//Home
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />

        <div className="content-container">
          <Routes>
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/register" element={<Register />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
