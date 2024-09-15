import React from "react";
import { useSelector } from "react-redux";
import "./Feed_Perfil.css";
import { useNavigate } from "react-router-dom";

const Feed_Perfil = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="container_Feed_Perfil ">
      <div className="art-card">
        <div className="user-info">
          <div className="card-background">
            <img src={user?.photoBanner} alt="Banner" />
          </div>
          <a onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
            <img
              className="photo"
              src={user?.photoURL ? user.photoURL : "/Images/photo.svg"}
              alt="User"
            />
            <div className="link">Bem-vindo, {user && user.displayName || user?.name}</div>
          </a>
        </div>
        <div className="widget">
          <a href="/rede">
            <div>
              <span>Conexões</span>
              <span>Aumente o seu network</span>
            </div>
            <p>{user.connections.length}</p>
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
