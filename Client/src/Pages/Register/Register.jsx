import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const interests = [
    "Ensino Superior",
    "Ensino Médio",
    "Ensino Básico",
    "Programação",
    "Fitness",
    "Tecnologia",
    "Marketing",
    "Mídias Sociais",
    "Ciência de Dados",
    "Design Gráfico",
    "Saúde",
    "Nutrição",
    "Empreendedorismo",
    "Desenvolvimento Pessoal",
    "Liderança",
    "Engenharia",
    "Arte",
    "Música",
    "Fotografia",
    "Esportes",
    "Cinema",
    "Culinária",
    "Viagens",
    "Carreiras",
    "Finanças",
    "Educação",
    "Psicologia",
    "Literatura",
    "História",
    "Moda",
  ];

  //ele tenta pegar o auth no useSelect, caso tenha é pq ainda tem um user logado, então ele só faz o redirecionamento.
  useEffect(() => {
    if (auth.id) {
      navigate("/home");
    }
  }, [auth.id, navigate]);

  const handleClickRegister = async (e) => {
    const user = { ...e };

    console.log(user);

    try {
      dispatch(registerUser(user));
      //so ser o register for feito
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  //fazer as validações no front, parar não sobrecarrecar o back, mas o ideal é fazer no backend
  const validationSchema = Yup.object().shape({
    photo: Yup.string().url("URL inválida").required("Campo obrigatório"),
    username: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Campo obrigatório"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "As senhas devem coincidir")
      .required("Campo obrigatório"),
  });

  //só pode uma div, então faz tudo dentro dessa ou <div>
  return (
    <div className="register-container">
      <div className="form-container">
        <div className="logo-container">
          <span className="logo">
            Empreg
            <img src="Images\logo.svg" alt="Logo da Aplicação" />
          </span>
        </div>
        <h1 className="title">Realize seu Cadastro</h1>
        <Formik
          initialValues={{
            photo: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleClickRegister}
        >
          <Form className="form">
            <div className="item-form-container">
              <p>Foto do Perfil</p>
              <Field
                type="text"
                id="photo"
                name="photo"
                placeholder="Informe a URL da Sua Foto"
              />
              <ErrorMessage
                name="photo"
                component="div"
                className="error-message"
              />
            </div>

            <div className="item-form-container">
              <p>Nome</p>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Informe seu Nome"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>

            <div className="item-form-container">
              <p>Email</p>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Informe seu Email"
              />
              <ErrorMessage
                name="email"
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

            <div className="item-form-container">
              <p>Confirme sua Senha</p>
              <Field
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Repita sua Senha"
              />
              <ErrorMessage
                name="passwordConfirm"
                component="div"
                className="error-message"
              />
            </div>

            <div className="item-form-container">
              <p>Interesse</p>
              <Field as="select" name="interest">
                {interests.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Field>
            </div>

            <div className="button-container">
              <button
                type="submit"
                className="button-register"
                onClick={handleClickRegister}
              >
                Cadastre-se
              </button>
              <span className="item-our">ou</span>
              <button
                type="button"
                onClick={() => dispatch(googleSignIn())}
                className="google"
              >
                <img src="/Images/google.svg" alt="google" />
                Continue with Google
              </button>
            </div>

            <div className="navigate-login-container">
              <p>
                Já faz parte da plataforma? <a href="/login">Fazer Login</a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
