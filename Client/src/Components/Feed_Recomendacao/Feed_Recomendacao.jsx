import React from "react";
import "./Feed_Recomendacao.css";
import { FaGraduationCap, FaCode, FaDumbbell, FaChartLine, FaMusic, FaCamera, FaPalette, FaBriefcase, FaHeart, FaLaptopCode, FaGamepad, FaUtensils, FaPlane, FaBook, FaFilm, FaCar, FaLightbulb, FaBrush, FaMicrophone } from "react-icons/fa"; 
import { AiOutlinePlus } from "react-icons/ai"; 

const Feed_Recomendacao = (props) => {
  const interests = [
    { name: "Ensino Superior", icon: <FaGraduationCap /> },
    { name: "Programação", icon: <FaCode /> },
    { name: "Fitness", icon: <FaDumbbell /> },
    { name: "Marketing", icon: <FaChartLine /> },
    { name: "Música", icon: <FaMusic /> },
    { name: "Fotografia", icon: <FaCamera /> },
    { name: "Arte", icon: <FaPalette /> },
    { name: "Carreira", icon: <FaBriefcase /> },
    { name: "Saúde", icon: <FaHeart /> },
    { name: "Desenvolvimento Web", icon: <FaLaptopCode /> },
    { name: "Jogos", icon: <FaGamepad /> },
    { name: "Culinária", icon: <FaUtensils /> },
    { name: "Viagens", icon: <FaPlane /> },
    { name: "Literatura", icon: <FaBook /> },
    { name: "Cinema", icon: <FaFilm /> },
    { name: "Automóveis", icon: <FaCar /> },
    { name: "Inovação", icon: <FaLightbulb /> },
    { name: "Design", icon: <FaBrush /> },
    { name: "Podcast", icon: <FaMicrophone /> },
    // Adicione mais interesses conforme necessário
  ];

  return (
    <div className="container_Feed_Recomendacao">
      <div className="follow-card">
        <div className="title">
          <h2>Interesses</h2>
          <img src="/Images/feed-icon.svg" alt="" />
        </div>

        <div className="grid-feed-list">
          {interests.map((interest, index) => (
            <div className="grid-item" key={index}>
              <a href="/">
                <div className="avatar">{interest.icon}</div>
              </a>
              <div className="interest-info">
                <span>#{interest.name}</span>
                <button>
                  <AiOutlinePlus /> Seguir
                </button>
              </div>
            </div>
          ))}
        </div>

        <a className="recommendation" href="/feed">
          Ver todas as recomendações
          <img src="/Images/right-icon.svg" alt="" />
        </a>
      </div>

      <div className="banner-card">
        <img src="/Images/Gabigol-Flamengo.jpg" alt="Banner" />
      </div>
    </div>
  );
};

export default Feed_Recomendacao;
