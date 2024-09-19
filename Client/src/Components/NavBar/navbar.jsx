import React, { useState, useEffect } from "react";
import "./Navbar.css";

import { BiComment } from "react-icons/bi";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaRss, FaSistrix } from "react-icons/fa6";
import { FiBook, FiUsers } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

import {
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

import { db } from "../../../firebase";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signOut } from "../../App-config-teste/user-slice";

import axios from 'axios';
import { toast } from "react-toastify";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  function signOutUser() {
    dispatch(signOut());
    navigate("/");
    localStorage.removeItem("Data");
  }

  const handleProfileClick = () => {
    navigate("/profile");
  };


  useEffect(() => {
    const fetchData = async () => {
      console.log("entrou no useEffect");
      try {
        // Verifica se os dados já estão no localStorage
        const storedData = localStorage.getItem("Data");

        if (storedData) {
          // Se os dados existirem no localStorage, usá-los diretamente
          setData(JSON.parse(storedData));
        } else {
          // Caso contrário, faz a requisição para buscar os dados
          const response = await axios.get(`http://localhost:5275/api/User/busca?idUsuarioLogado=${user.uid}`);
          console.log("fez request")
          // Armazena os dados no localStorage e atualiza o estado
          localStorage.setItem("Data", JSON.stringify(response.data));
          setData(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    // Garante que a requisição seja feita apenas uma vez
    if (!localStorage.getItem("Data")) {
      fetchData();
    } else {
      // Usa os dados do localStorage se eles já estiverem presentes
      setData(JSON.parse(localStorage.getItem("Data")));
    }
  }, [user.uid, user.skill_tags]);

  
  /* const users = [
    { id: "15FyyOaz7VWOhtRiDAX8", name: "João Silva", description: "Desenvolvedor Frontend", skills_tags : ["Música", "Fitness", "Programação"], photoURL: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", connections: ["1", "2"]},
    { id: "VWlQZ1y89vRw7tPYBbkZ", name: "Maria Souza", description: "Designer Gráfico", skills_tags : ["Saúde", "Marketing", "Ensino básico"], photoURL: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", connections: ["1", "4", "4", "4", "4"]},
    { id: "WpCV7MLcVfrriTdLJtlG", name: "Pedro Oliveira", description: "Engenheiro de Software", skills_tags : ["Marketing", "Carro", "Moda"], photoURL: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", connections: ["1", "3"]},
  ]; */

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = data.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleAddConnection = async (user) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
  

      console.log(user)
    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);
      console.log(senderDoc)
      if (senderDoc.exists()) {
        const senderData = senderDoc.data();
        const updatedConnectionSend = [...(senderData.connections_send || []), user];
        await updateDoc(senderRef, { connections_send: updatedConnectionSend });
      }
  
      const receiverRef = doc(db, "users", user.id);
      const receiverDoc = await getDoc(receiverRef);
  
      if (receiverDoc.exists()) {
        const receiverData = receiverDoc.data();
        const updatedConnectionReceived = [...(receiverData.connections_received || []), storedUser];
        await updateDoc(receiverRef, { connections_received: updatedConnectionReceived });
      }
      toast.success("Conexão adicionada com sucesso");

      setTimeout(() => {
        window.location.reload();
      }, 2000)
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="box_logo">
          <img src="Images/logo.svg" alt="Logo da Aplicação" />
        </div>
        <div className="box_icons_navigation">
          <ul>
            <li>
              <a onClick={() => navigate("/feed")}>
                <FaRss /> <span>Feed</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/rede")}>
                <FiUsers /> <span>Rede</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/conexoes")}>
                <BsSuitcaseLg /> <span>Conexões</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/chat")}>
                <BiComment /> <span>Chat</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/algortimo")}>
                <FiBook /> <span>Algoritmo</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="box_search">
          <label htmlFor="search">
            <FaSistrix />
          </label>
          <input
            type="text"
            placeholder="Search"
            id="search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="box_account">
          <div className="box_profile_image" onClick={handleProfileClick}>
            <img
              src={
                user?.photoURL ? user.photoURL : "src/assets/profile_image.png"
              }
              alt="Foto de Perfil"
            />
          </div>
          <div className="box_accounts_info">
            <div className="box_info_name">
              <h2 className="profile_name">
                {(user && user.displayName) || user?.name}
              </h2>
            </div>
            <div className="box_info_views">
              <p className="views_today">{user.connections.length} Conexões</p>
              {/* <span className="new_followers">
                +32 <MdArrowOutward />
              </span> */}
            </div>
          </div>
        </div>
        <div className="box_logout">
          <button className="btn_logout" type="button" onClick={signOutUser}>
            <IoIosLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Resultados da Busca</h2>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((user) => (
                  <div style={{ display: "flex"}} key={user.id}>
                    <li key={user.id} className="search-result-user" style={{ width: "100%"}}>
                      <h3>{user.name}</h3>
                    </li>

                    <button onClick={() => handleAddConnection(user)} className="contact-info-btn" style={{ marginBottom: "1.5rem", marginTop: "0"}}>Conectar</button>
                  </div>
                ))}
              </ul>
            ) : (
              <p>Nenhum usuário encontrado.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
