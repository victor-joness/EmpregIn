import React from "react";

import "./Navbar.css";

import { FiUsers } from "react-icons/fi";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaSistrix } from "react-icons/fa6";
import { FaRss } from "react-icons/fa6";
import { FiBook } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { MdArrowOutward } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signOut } from "../../App-config-teste/user-slice";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOutUser() {
    console.log("Clicou para Deslogar");

    dispatch(signOut());

    navigate("/");
  }

  return (
    <div className="header">
      <div className="box_logo">
        <img src="Images\logo.svg" alt="Logo da Aplicação" />
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
        <input type="text" placeholder="Search" id="search" />
      </div>
      <div className="box_account">
        <div className="box_profile_image">
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
    </div>
  );
};

export default NavBar;
