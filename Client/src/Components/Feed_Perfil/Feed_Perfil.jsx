import React from "react";
import { useSelector } from "react-redux";
import "./Feed_Perfil.css";

const Feed_Perfil = (props) => {
  const user = useSelector((state) => state.user.value);

  return (
    <div className="container_Feed_Perfil ">
      <div className="art-card">
        <div className="user-info">
          <div className="card-background"></div>
          <a href="/">
            <img
              className="photo"
              src={user?.photoURL ? user.photoURL : "/Images/photo.svg"}
              alt="User"
            />
            <div className="link">Bem vindo, {user && user.displayName}</div>
          </a>
          <a href="/">
            <div className="add-photo-text">Adicionar uma foto</div>
          </a>
        </div>
        <div className="widget">
          <a href="/feed">
            <div>
              <span>conexões</span>
              <span>Aumente o seu network</span>
            </div>
            <p>130</p>
          </a>
        </div>
        <a className="item" href="/">
          <span>
            <img src="/Images/item-icon.svg" alt="Item Icon" />
            Meus Itens
          </span>
        </a>
      </div>

      <div className="community-card community-card-backgroud">
        <a href="/">
          <span>Grupos</span>
        </a>
        <a href="/">
          <span>
            Eventos
            <img src="/Images/plus-icon.svg" alt="Plus Icon" />
          </span>
        </a>
        <a href="/">
          <span>Seguir outras pessoas</span>
        </a>
        <a href="/">
          <span>Descobrir mais</span>
        </a>
      </div>
    </div>
  );
};

export default Feed_Perfil;
