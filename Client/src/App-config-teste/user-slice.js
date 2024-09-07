import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { db, auth, provider } from "../../firebase";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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
      return user; // Retorna o objeto user após o registro
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message); // Acessa o erro corretamente
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
      state.value = null;
      state.token = null;
      state.userID = null;
      state.name = null;
      state.email = null;
      state.photoURL = null;
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
        window.location.href("/login");
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
  },
});

export const { signIn, signOut } = UserSlice.actions;
export default UserSlice.reducer;
