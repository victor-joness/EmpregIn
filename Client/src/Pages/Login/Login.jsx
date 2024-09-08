import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../App-config-teste/user-slice";
import { Navigate } from "react-router-dom";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);

  if(user){
    return <Navigate to={"/feed"} />
  }

  const validationLogin = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Sua senha deve ter pelo menos 6 caracteres")
      .required("Este campo é obrigatório"),
  });

  const handleClickLogin = async (values) => {
    try {
      dispatch(loginUser(values));
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="logo-container">
          <span className="logo">
            Empreg
            <img src="Images/logo.svg" alt="Logo da Aplicação" />
          </span>
        </div>
        <h1 className="title">Login</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationLogin}
          onSubmit={(values) => {
            handleClickLogin(values);
          }}
        >
          <Form className="form">
            <div className="item-form-container">
              <p>Email</p>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="Email de Usuário"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="item-form-container">
              <p>Senha</p>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Informe sua Senha"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="button-container">
              <button type="submit" className="button-login">
                Entrar
              </button>
              <span className="item-our">ou</span>
              <button
                type="button"
                onClick={() => dispatch(googleSignIn())}
                className="google"
              >
                <img src="/Images/google.svg" alt="google" />
                Entrar com o Google
              </button>
            </div>

            <div className="navigate-login-container">
              <p>
                Ainda não tem conta? <a href="/register">Registre-se</a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
