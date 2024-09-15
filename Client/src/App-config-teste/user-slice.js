import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
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
  doc,
  getDoc,
} from "firebase/firestore";

const initialState = {
  uid: "",
  connections: [],
  connections_send: [],
  connections_received: [],
  current_position: "",
  description: "",
  email: "",
  name: "",
  photoURL: "",
  photoBanner: "",
  locality: "",
  password: "",
  qualification: "",
  skills_tags: [],
  education: [],
  experience: [],
  projects: [],
  hability: [],
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
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", payload.user.email)
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      return registerUser(payload.user);
    } else {
      return loginUser(payload.user);
    }
  }
);

// Ação para registro de usuário
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user, { rejectWithValue }) => {
    const userBanco = {
      id: uuid(),
      connections: [],
      connections_send: [],
      connections_received: [],
      current_position: "",
      description: "",
      email: user.email,
      name: user.name,
      photoURL: user.photoURL,
      photoBanner: user.photoURL,
      locality: "",
      password: "",
      qualification: "",
      skills_tags: [user.interest],
      education: [],
      experience: [],
      projects: [],
      hability: [],
      creation_date: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(db, "users"), userBanco);

      toast.success("Registro feito com sucesso!");
      userBanco.id = docRef.id;

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userBanco
        })
      );
      return userBanco;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Ação para login de usuário
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        throw new Error("Usuário não encontrado");
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
      // Recupera os dados do usuário do local storage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        throw new Error("Usuário não encontrado no local storage");
      }

      // Faz o parse do JSON armazenado para obter o email
      const parsedUser = JSON.parse(storedUser);
      const userEmail = parsedUser.email;

      if (!userEmail) {
        throw new Error("Email do usuário não encontrado no local storage");
      }

      // Cria uma consulta para buscar o usuário pelo email no Firestore
      const q = query(collection(db, "users"), where("email", "==", userEmail));

      // Executa a consulta
      const querySnapshot = await getDocs(q);

      // Verifica se encontrou algum documento
      if (querySnapshot.empty) {
        throw new Error("Usuário não encontrado no banco de dados");
      }

      // Como o email é único, podemos pegar o primeiro documento retornado
      const userData = querySnapshot.docs[0].data();
      userData.id = querySnapshot.docs[0].id;

      // Atualiza os dados do usuário no local storage
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
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
      const user = action.payload;
      state.uid = user.uid;
      state.email = user.email;
      state.name = user.displayName;
      state.photoURL = user.photoURL;
      state.userLoaded = true;
      state.loading = false;
    },
    signOut: (state) => {
      localStorage.removeItem("user");
      Object.assign(state, initialState);
      toast.success("Logout realizado com sucesso");
    },
    updateUserSkills: (state, action) => {
      const newSkill = action.payload;
      if (!state.skills_tags.includes(newSkill)) {
        state.skills_tags.push(newSkill);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.loginStatus = "pending";
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        const user = action.payload;
        state.uid = user.uid;
        state.token = user.accessToken;
        state.email = user.email;
        state.name = user.displayName;
        state.photoURL = user.photoURL;
        state.loginStatus = "fulfilled";
        state.loading = false;
        if (!state.toastDisplayed) {
          toast.success("Login bem-sucedido!");
          window.location.href = "/feed";
          state.toastDisplayed = true;
        }
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loginStatus = "rejected";
        state.loginError = action.payload;
        state.loading = false;
        toast.error("Erro ao fazer login com o Google");
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "pending";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const user = action.payload;
        console.log(user);
        state.uid = user.id;
        state.email = user.email;
        state.name = user.name;
        state.photoURL = user.photoURL;
        state.photoBanner = user.photoBanner;
        state.connections = user.connections;
        state.connections_send = user.connections_send;
        state.connections_received = user.connections_received;
        state.current_position = user.current_position;
        state.description = user.description;
        state.locality = user.locality;
        state.qualification = user.qualification;
        state.skills_tags = user.skills_tags;
        state.education = user.education;
        state.experience = user.experience;
        state.projects = user.projects;
        state.hability = user.hability;
        state.creation_date = user.creation_date;
        state.loading = true;
        state.toastDisplayed = true;
        state.userLoaded = true;
        state.registerStatus = "fulfilled";
        toast.success("Registro realizado com sucesso!");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "rejected";
        state.registerError = action.payload;
        toast.error("Erro ao registrar");
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginStatus = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.uid = user.id;
        state.email = user.email;
        state.name = user.name;
        state.photoURL = user.photoURL;
        state.photoBanner = user.photoBanner;
        state.connections = user.connections;
        state.connections_send = user.connections_send;
        state.connections_received = user.connections_received;
        state.current_position = user.current_position;
        state.description = user.description;
        state.locality = user.locality;
        state.qualification = user.qualification;
        state.skills_tags = user.skills_tags;
        state.education = user.education;
        state.experience = user.experience;
        state.projects = user.projects;
        state.hability = user.hability;
        state.creation_date = user.creation_date;
        state.loading = true;
        state.toastDisplayed = true;
        state.userLoaded = true;
        state.loginStatus = "fulfilled";
        toast.success("Login realizado com sucesso!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "rejected";
        state.loginError = action.payload;
        state.loading = false;
        toast.error("Erro ao fazer login");
      })
      .addCase(verifyAuthAndFetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuthAndFetchUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.uid = user.id;
        state.name = user.name;
        state.email = user.email;
        state.photoURL = user.photoURL;
        state.photoBanner = user.photoBanner;
        state.connections = user.connections;
        state.connections_send = user.connections_send;
        state.connections_received = user.connections_received;
        state.current_position = user.current_position;
        state.description = user.description;
        state.locality = user.locality;
        state.qualification = user.qualification;
        state.skills_tags = user.skills_tags;
        state.education = user.education;
        state.experience = user.experience;
        state.projects = user.projects;
        state.hability = user.hability;
        state.creation_date = user.creation_date;
        state.userLoaded = true;
        state.loading = false;
      })
      .addCase(verifyAuthAndFetchUser.rejected, (state, action) => {
        state.loading = false;
        state.loginStatus = "rejected";
        state.loginError = action.payload;
      });
  },
});

export const { signIn, signOut, updateUserSkills } = UserSlice.actions;
export default UserSlice.reducer;
