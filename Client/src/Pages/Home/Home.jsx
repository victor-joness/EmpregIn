import React from "react";
import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { googleSignIn } from "../../App-config-teste/user-slice";

const Home = () => {
  document.title = "Home | EmpregIn";
  const user = useSelector((state) => state.user.value);

  if(user){
    return <Navigate to={"feed"} />
  }

  const dispatch = useDispatch();

  return (
    <div className="container">
      {user && <Navigate to={"feed"} />}
      <nav>
        <a href="/">
          <img src="/Images/logo_grande.png" alt="logo" />
        </a>
        <div>
          {user ? (
            <a href="/login" className="feed">
              ir para o feed
            </a>
          ) : (
            <>
            
            </>
          )}
        </div>
      </nav>

      <section className="section-main">
  <div className="hero">
    <h1>Seja bem vindo a sua comunidade profissional</h1>
    <img src="/Images/hero.svg" alt="hero" />
  </div>
  <div className="form">
    <button onClick={() => dispatch(googleSignIn())} className="google">
      <img src="/Images/google.svg" alt="google" />
      Entrar com o Google
    </button>
    <div className="form-buttons">
      <a href="/register" className="join">
        Junte-se agora
      </a>
      <a href="/login" className="login">
        Entrar
      </a>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
