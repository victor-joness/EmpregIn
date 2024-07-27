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
      <h1>REGISTER</h1>
    </div>
  );
};

export default Register;
