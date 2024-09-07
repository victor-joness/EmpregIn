import React from "react";
import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { googleSignIn } from "../../App-config-teste/user-slice";
import { toast } from "react-toastify";

/*________________________________________________________________________________*/

const Home = () => {
  document.title = "Home | EmpregIn";
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  return (
    <div className="container">
      {user && <Navigate to={"feed"} />}
      <nav>
        <a href="/">
          <img src="/Images/login-logo.svg" alt="logo" />
        </a>
        <div>
          {user ? (
            <a href="/login" className="feed">
              ir para o feed
            </a>
          ) : (
            <>
              <a href="/register" className="join">
                Cadastre-se agora
              </a>
              <a href="/login" className="login">
                Entrar
              </a>
            </>
          )}
        </div>
      </nav>

      <section className="section-main">
        <div className="hero">
          <h1>Welcome to your professional community</h1>
          <img src="/Images/hero.svg" alt="hero" />
        </div>
        <div className="form">
          <button onClick={() => dispatch(googleSignIn())} className="google">
            <img src="/Images/google.svg" alt="google" />
            Sign in with Google
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
