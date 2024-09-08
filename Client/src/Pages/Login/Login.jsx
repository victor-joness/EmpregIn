import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Validações com Yup
  const validationLogin = yup.object().shape({
    name: yup
      .string()
      .min(3, "Seu nome deve ter pelo menos 3 caracteres")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(6, "Sua senha deve ter pelo menos 6 caracteres")
      .required("Este campo é obrigatório"),
  });

  const handleClickLogin = async (values) => {
    try {
      console.log(values);
      // Adicione o código de login aqui
      // dispatch(loginUser(values));
      // navigate("/home");
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
            name: "",
            password: "",
          }}
          validationSchema={validationLogin}
          onSubmit={(values) => {
            handleClickLogin(values);
          }}
        >
          <Form className="form">
            <div className="item-form-container">
              <p>Nome</p>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Nome de Usuário"
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
