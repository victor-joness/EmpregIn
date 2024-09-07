import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Feed from "./Pages/Feed/Feed";

import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signIn } from "./App-config-teste/user-slice";
import Network from "./Pages/Network/Network";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch(signIn(user));
  //     }
  //   });
  // });
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer/>
          <div className="content-container">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/rede" element={<Network />}/>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
