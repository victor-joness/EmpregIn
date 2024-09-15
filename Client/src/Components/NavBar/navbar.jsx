import React, { useState } from "react";
import "./Navbar.css";

import { BiComment } from "react-icons/bi";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaRss, FaSistrix } from "react-icons/fa6";
import { FiBook, FiUsers } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signOut } from "../../App-config-teste/user-slice";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOutUser() {
    console.log("Clicou para Deslogar");
    dispatch(signOut());
    navigate("/");
  }

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Simulação de resultados de busca
  const users = [
    { id: 1, name: "João Silva", about: "Desenvolvedor Frontend" },
    { id: 2, name: "Maria Souza", about: "Designer Gráfico" },
    { id: 3, name: "Pedro Oliveira", about: "Engenheiro de Software" },
  ];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = users.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className="header">
      <div className="box_logo">
        <img src="Images/logo.svg" alt="Logo da Aplicação" />
      </div>
      <div className="box_icons_navigation">
        <ul>
          <li>
            <a href="/feed">
              <FaRss /> <span>Feed</span>
            </a>
          </li>
          <li>
            <a href="/rede">
              <FiUsers /> <span>Rede</span>
            </a>
          </li>
          <li>
            <a href="/conexao">
              <BsSuitcaseLg /> <span>Conexões</span>
            </a>
          </li>
          <li>
            <a href="">
              <BiComment /> <span>Chat</span>
            </a>
          </li>
          <li>
            <a href="/algoritmo">
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
              user?.photoURL ? user.photoURL : 'src/assets/profile_image.png'
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
            <p className="views_today">367 Conexões</p>
            <span className="new_followers">
              +32 <MdArrowOutward />
            </span>
          </div>
        </div>
      </div>
      <div className="box_logout">
        <button className="btn_logout" type="button" onClick={signOutUser}>
          <IoIosLogOut />
          <span>Logout</span>
        </button>
      </div>

      {/* Modal de Resultados da Busca */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Resultados da Busca</h2>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((user) => (
                  <li key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.about}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum usuário encontrado.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
