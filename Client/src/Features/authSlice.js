/* import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import uuid from "react-uuid";

import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  uid: "",
  connections: "",
  current_position: "",
  description: "",
  email: "",
  name: "",
  photo: "",
  locality: "",
  password: "",
  qualification: "",
  skills_tags: [],
  creation_date: "",
  registerStatus: "",
  registerError: "",
  userLoaded: false,
};

//esse registerUser recebe esse createAsyncThunk, esse asynThunk é usado em funcoes assyncronas, e eu posso definir tipos para isso de acordo com o que ele me retorna
//podendo ser pending,fulfilled,rejected e fazer alguma coisa de acorodo com esses retornos.
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      addDoc(collection(db, "users"), {
        id: uuid(),
        connections: user.connections,
        current_position: user.current_position,
        description: user.description,
        email: user.email,
        name: user.username,
        photo: user.photo,
        locality: user.locality,
        password: user.password,
        qualification: user.qualification,
        skills_tags: [user.interest],
        creation_date: Timestamp.now(),
      }).then(() => {
        toast.success("Registro feito com sucesso!");
      });

      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

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
      const user = action.payload;

      state.uid = user.id;
      state.connections = user.connections;
      state.current_position = user.current_position;
      state.description = user.description;
      state.email = user.email;
      state.name = user.name;
      state.photo = user.photo;
      state.locality = user.locality;
      state.password = user.password;
      state.qualification = user.qualification;
      state.skills_tags = [user.interest];
      state.creation_date = user.creation_date;
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
 */