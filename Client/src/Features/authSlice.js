import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { getUniqueID } from "../helpers/getUniqueId";

/*COLOCAR AS JANELAS DE ERROS TODAS DE ACORDO COM A REQUISIÇÃO E NAO COM BASE NO FRONT-END */

const initialState = {
  token: localStorage.getItem("token"),
  userID: "",
  name: "",
  email: "",
  Img: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

//esse registerUser recebe esse createAsyncThunk, esse asynThunk é usado em funcoes assyncronas, e eu posso definir tipos para isso de acordo com o que ele me retorna
//podendo ser pending,fulfilled,rejected e fazer alguma coisa de acorodo com esses retornos.
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    console.log(user);
    try {
      //vamos fazer a requisição para api com essa url http://localhost:5005/api/register passando o objeto user como corpo da requisição
      const data = await axios.post(`${url}/register`, {
        userId: getUniqueID(),
        name: user.username,
        email: user.email,
        password: user.password,
        img: user.Img,
      });

      localStorage.setItem("token", data.data.token);
      return data.data.token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//aqui temos um "slice" do redux, aqui a gente pode definir um objeto e esse objeto pode ter varios estados(states), atraves do inicialState a genter define esse estados
//temos tbm os reducers -> que sao actions pode ser traduzido como "metodos" que vão mexer nesses estados, nesse caso temos um logout e um load user;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          userID: user.id,
          name: user.name,
          email: user.email,
          Img: user.Img,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        userID: "",
        name: "",
        email: "",
        Img: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        toast.success("Registro realizado com sucesso");
        return {
          ...state,
          token: action.payload,
          userId: user.id,
          name: user.name,
          email: user.email,
          Img: user.Img,
          registerStatus: "success",
        };
      } else {
        toast.error("Erro ao registrar");
        return state;
      }
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      toast.error("Erro ao registrar");
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
