import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //ele tenta pegar o auth no useSelect, caso tenha é pq ainda tem um user logado, então ele só faz o redirecionamento.
  useEffect(() => {
    if (auth.id) {
      navigate("/home");
    }
  }, [auth.id, navigate]);

  const [user, setUser] = useState({
    userID: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickRegister = async () => {
    try {
      dispatch(registerUser(user));
      //so ser o register for feito
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  //fazer as validações no front, parar não sobrecarrecar o back, mas o ideal é fazer no backend
  const validationRegister = yup.object().shape({
    name: yup
      .string()
      .min(3, "Seu nome deve ter pelo menos 3 caracteres")
      .required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("insira um email valido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(6, "Sua senha deve ter pelo menos 6 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .required("Este campo é obrigatório")
      .test("passwords-match", "A senha deve ser igual", function (value) {
        return this.parent.password === value;
      }),
  });

  //só pode uma div, então faz tudo dentro dessa ou <div>
  return (
    <div className="register-container">
        <div className="logo-container">
            <img src="Images\logo.svg" alt="Logo da Aplicação" />
        </div>
        <div className="form-container">
            <h1 className="title">Realize seu Cadastro</h1>
            <form method="POST" action="/">
                <div className="item-form-container">
                    <label htmlFor="photo">Foto do Perfil:</label>
                    <input type="text" id="photo" placeholder="Informe a URL da Sua Foto" name="img" />
                </div>
                <div className="item-form-container">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" placeholder="Informe seu Nome" name="username" />
                </div>
                <div className="item-form-container">
                    <label htmlFor="mail">Email:</label>
                    <input type="email" id="mail" placeholder="Informe seu Email" name="email" required />
                </div>
                <div className="item-form-container">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" placeholder="Informe sua Senha" name="password" required />
                </div>
                <div className="item-form-container">
                    <label htmlFor="password-confirm">Confirme sua Senha:</label>
                    <input type="password" id="password-confirm" placeholder="Repita sua Senha" required />
                </div>
                <div className="button-container">
                    <button type="submit" onClick={handleClickRegister} className="button-register" >
                        Cadastre-se
                    </button>
                    <span className="item-our">ou</span>
                    <button onClick={() => dispatch(googleSignIn())} className="google">
                        <img src="/Images/google.svg" alt="google" />
                        Continue with Google
                    </button>
                </div>
                <div className="navigate-login-container">
                    <p>Já faz parte da plataforma? <a href="/login">Fazer Login</a></p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Register;
