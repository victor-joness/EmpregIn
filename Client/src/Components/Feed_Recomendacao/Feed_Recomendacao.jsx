import React from "react";
import "./Feed_Recomendacao.css";

const Feed_Recomendacao = (props) => {
  return (
    <div className="container_Feed_Recomendacao ">
      <div className="follow-card">
        <div className="title">
          <h2>Adicionar ao seu feed</h2>
          <img src="/Images/feed-icon.svg" alt="" />
        </div>

        <ul className="feed-list">
          <li>
            <a href="/">
              <div className="avatar" />
            </a>
            <div>
              <span>#Linkedin</span>
              <button>
                <img src="/Images/plus-icon.svg" alt="plus" />
                Seguir
              </button>
            </div>
          </li>
          <li>
            <a href="/feed">
              <div className="avatar" />
            </a>
            <div>
              <span>#Video</span>
              <button>
                <img src="/Images/plus-icon.svg" alt="plus" /> Seguir
              </button>
            </div>
          </li>
        </ul>

        <a className="recommendation" href="/feed">
          Ver todas as recomendações
          <img src="/Images/right-icon.svg" alt="" />
        </a>
      </div>
      <div className="banner-card">
        <img src="/Images/Gabigol-Flamengo.jpg" alt="" />
      </div>
    </div>
  );
};

export default Feed_Recomendacao;
