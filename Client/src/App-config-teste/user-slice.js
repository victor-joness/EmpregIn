import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { toast } from "react-toastify";

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
  loading: false,
  toastDisplayed: false,
};

export const googleSignIn = createAsyncThunk(
  "users/googleSignInStatus",
  async () => {
    const payload = await signInWithPopup(auth, provider);
    console.log(payload.user);
    return payload.user;
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
      state.Img = action.payload.photoURL;
      state.userLoaded = true;
      state.loading = true;
      if (!state.toastDisplayed) {
        toast.success("Usuário resgatado com sucesso");
        state.toastDisplayed = true;
      }
    },
    signOut: (state) => {
      state.value = null;
      state.token = null;
      state.userID = null;
      state.name = null;
      state.email = null;
      state.Img = null;
      state.userLoaded = false;
      state.loading = false;
      toast.success("Logout realizado com sucesso");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        return { ...state, loginStatus: "pending" };
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        console.log("teste");
        state.value = action.payload;
        state.token = action.payload.accessToken;
        state.userID = action.payload.uid;
        state.name = action.payload.displayName;
        state.email = action.payload.email;
        state.Img = action.payload.photoURL;
        state.loading = true;
        state.loginStatus = "fulfilled";
        if (!state.toastDisplayed) {
          toast.success("Login bem-sucedido!");
          state.toastDisplayed = true;
        }
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        toast.error("Erro ao fazer login");
        return {
          ...state,
          loginStatus: "rejected",
          loginError: action.payload,
        };
      });
  },
});

export const { signIn, signOut } = UserSlice.actions;
export default UserSlice.reducer;
