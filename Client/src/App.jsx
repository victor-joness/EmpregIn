import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Feed from "./Pages/Feed/Feed";
import Network from "./Pages/Network/Network";
import ProfilePage from "./Pages/Profile/ProfilePage";
import Conexoes from "./Pages/Conexões/Conexoes";
import Algoritm from "./Pages/Algoritm/Algoritm";

import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signIn, verifyAuthAndFetchUser } from "./App-config-teste/user-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(verifyAuthAndFetchUser());
    }

    /* const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(signIn(user));
      }
    }); */

    /* return () => {
      unsubscribeAuth();
    }; */
  }, [dispatch]);

  /*login = 16 requests em 5 minutos, 22 em 8 minutos, 25 em 10 minutos */
  /*algortimo = 2 request*/
  /*Rodando tudo = */
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        <div className="content-container">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/rede" element={<Network />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/conexoes" element={<Conexoes />} />
            <Route path="/algortimo" element={<Algoritm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
