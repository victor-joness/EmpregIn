import { useState, useEffect } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { db, auth, provider } from "../../firebase";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  getDocs,
  where,
} from "firebase/firestore";

const initialState = {
  uid: "",
  connections: "",
  current_position: "",
  description: "",
  email: "",
  name: "",
  photoURL: "",
  locality: "",
  password: "",
  qualification: "",
  skills_tags: [],
  creation_date: "",
  registerStatus: "",
  registerError: "",
  userLoaded: false,
  loading: false,
  toastDisplayed: false,
};

// Ação para login com Google
export const googleSignIn = createAsyncThunk(
  "users/googleSignInStatus",
  async () => {
    const payload = await signInWithPopup(auth, provider);
    return payload.user;
  }
);

// Ação para registro de usuário
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      await addDoc(collection(db, "users"), {
        id: uuid(),
        connections: user.connections,
        current_position: user.current_position,
        description: user.description,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
        locality: user.locality,
        password: user.password,
        qualification: user.qualification,
        skills_tags: [user.interest],
        creation_date: Timestamp.now(),
      });

      toast.success("Registro feito com sucesso!");
      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      if (!user.email || !user.password) {
        throw new Error("Email e senha são obrigatórios");
      }

      const q = query(
        collection(db, "users"),
        where("email", "==", user.email),
        where("password", "==", user.password)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Usuário não encontrado ou senha incorreta");
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          id: userDoc.id,
        })
      );

      return {
        ...userData,
        id: userDoc.id,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyAuthAndFetchUser = createAsyncThunk(
  "users/verifyAuthAndFetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        throw new Error("Usuário não encontrado no local storage");
      }

      return JSON.parse(storedUser);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.value = action.payload;
      state.token = action.payload.accessToken;
      state.userID = action.payload.uid;
      state.name = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.userLoaded = true;
      state.loading = true;
    },
    signOut: (state) => {
      // Limpar local storage
      localStorage.removeItem("user");

      // Limpar estado
      state.uid = "";
      state.value = null;
      state.connections = "";
      state.current_position = "";
      state.description = "";
      state.email = "";
      state.name = "";
      state.photoURL = "";
      state.locality = "";
      state.password = "";
      state.qualification = "";
      state.skills_tags = [];
      state.creation_date = "";
      state.userLoaded = false;
      state.loading = false;
      toast.success("Logout realizado com sucesso");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleSignIn.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });

    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      state.value = action.payload;
      state.token = action.payload.accessToken;
      state.userID = action.payload.uid;
      state.name = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.loading = true;
      state.loginStatus = "fulfilled";
      if (!state.toastDisplayed) {
        toast.success("Login bem-sucedido!");
        window.location.href = "/feed";
        state.toastDisplayed = true;
      }
    });

    builder.addCase(googleSignIn.rejected, (state, action) => {
      toast.error("Erro ao fazer login");
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.value = user;
      state.photoURL = user.photoURL;
      state.connections = user.connections;
      state.current_position = user.current_position;
      state.description = user.description;
      state.email = user.email;
      state.name = user.name;
      state.qualification = user.qualification;
      state.skills_tags = [user.interest];
      state.creation_date = user.creation_date;
      state.registerStatus = "fulfilled";
      state.registerError = "";
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      toast.error("Erro ao registrar");
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    builder.addCase(loginUser.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.value = user;
      state.photoURL = user.photoURL;
      state.connections = user.connections;
      state.current_position = user.current_position;
      state.description = user.description;
      state.email = user.email;
      state.name = user.name;
      state.qualification = user.qualification;
      state.skills_tags = user.skills_tags;
      state.creation_date = user.creation_date;
      state.loginStatus = "fulfilled";
      state.loginError = "";
      toast.success("Login realizado com sucesso!");
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      toast.error(action.payload || "Erro ao fazer login");
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    builder.addCase(verifyAuthAndFetchUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(verifyAuthAndFetchUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.value = user;
      state.uid = user.id;
      state.name = user.name;
      state.email = user.email;
      state.photoURL = user.photoURL;
      state.current_position = user.current_position;
      state.description = user.description;
      state.locality = user.locality;
      state.qualification = user.qualification;
      state.skills_tags = user.skills_tags;
      state.creation_date = user.creation_date;
      state.userLoaded = true;
      state.loading = false;
      state.loginStatus = "fulfilled";
      state.loginError = "";
    });

    builder.addCase(verifyAuthAndFetchUser.rejected, (state, action) => {
      state.loading = false;
      state.loginStatus = "rejected";
      state.loginError = action.payload;
    });
  },
});

export const { signIn, signOut } = UserSlice.actions;
export default UserSlice.reducer;
