import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/Navbar";
import "./Network.css";
import { MdArrowOutward } from "react-icons/md";
import {
  FaUserFriends,
  FaUserPlus,
  FaUsers,
  FaUsersCog,
  FaRegBuilding,
  FaHashtag,
} from "react-icons/fa";

import { useSelector } from "react-redux";

import Footer from "../../Components/Footer/Footer";

const Network = (props) => {
  document.title = "Rede | EmpregIn";

  const user = useSelector((state) => state.user.value);

  const [RecebidaOuEnviada, setRecebidaOuEnviada] = useState("Recebidas");

  const interests = [
    "Ensino Superior",
    "Ensino Médio",
    "Ensino Básico",
    "Programação",
    "Fitness",
    "Tecnologia",
    "Marketing",
    "Mídias Sociais",
    "Ciência de Dados",
    "Design Gráfico",
    "Saúde",
    "Nutrição",
    "Empreendedorismo",
    "Desenvolvimento Pessoal",
    "Liderança",
    "Engenharia",
    "Arte",
    "Música",
    "Fotografia",
    "Esportes",
    "Cinema",
    "Culinária",
    "Viagens",
    "Carreiras",
    "Finanças",
    "Educação",
    "Psicologia",
    "Literatura",
    "História",
    "Moda",
  ];

  const usersRecebidos = [
    {
      id: 1,
      name: "Victor",
      img: "src/assets/profile_image.png",
      status: "online",
      cargo: "Desenvolvedor",
      conexoes: 20,
    },
    {
      id: 2,
      name: "Joao teste",
      img: "src/assets/profile_image.png",
      status: "online",
      cargo: "Desenvolvedor",
      conexoes: 30,
    },
  ];

  const usersEnviados = [
    {
      id: 1,
      name: "Victor",
      img: "src/assets/profile_image.png",
      status: "online",
      cargo: "Desenvolvedor",
      conexoes: 20,
    },
    {
      id: 2,
      name: "Joao teste",
      img: "src/assets/profile_image.png",
      status: "online",
      cargo: "Desenvolvedor",
      conexoes: 30,
    },
    {
      id: 3,
      name: "Joao teste",
      img: "src/assets/profile_image.png",
      status: "online",
      cargo: "Desenvolvedor",
      conexoes: 30,
    },
    {
      id: 4,
      name: "Joao teste",
      img: "src/assets/profile_image.png",
      status: "online",
      cargo: "Desenvolvedor",
      conexoes: 30,
    },
  ];

  const [selectedButton, setSelectedButton] = useState("Conexões");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="network_container">
      <NavBar />
      <div className="network_layout">
        <div className="network_buttons_container">
          <button
            className={selectedButton === "Conexões" ? "selected" : ""}
            onClick={() => handleButtonClick("Conexões")}
          >
            <FaUserFriends /> Conexões
          </button>
          <button
            className={selectedButton === "Convites" ? "selected" : ""}
            onClick={() => handleButtonClick("Convites")}
          >
            <FaUserPlus /> Convites
          </button>
          <button
            className={selectedButton === "TeamMates" ? "selected" : ""}
            onClick={() => handleButtonClick("TeamMates")}
          >
            <FaUsers /> TeamMates
          </button>
          <button
            className={selectedButton === "Grupos" ? "selected" : ""}
            onClick={() => handleButtonClick("Grupos")}
          >
            <FaUsersCog /> Grupos
          </button>
          <button
            className={selectedButton === "Paginas" ? "selected" : ""}
            onClick={() => handleButtonClick("Paginas")}
          >
            <FaRegBuilding /> Páginas
          </button>
          <button
            className={selectedButton === "HashTags" ? "selected" : ""}
            onClick={() => handleButtonClick("HashTags")}
          >
            <FaHashtag /> HashTags
          </button>
        </div>

        <div className="network_listagem">
          {selectedButton == "Conexões" ? (
            RecebidaOuEnviada == "Recebidas" ? (
              <>
                <div className="network_recebidas_enviadas">
                  <button
                    className={
                      RecebidaOuEnviada === "Recebidas" ? "selected" : ""
                    }
                    onClick={() => setRecebidaOuEnviada("Recebidas")}
                  >
                    Recebidas
                  </button>

                  <button
                    className={
                      RecebidaOuEnviada === "Enviadas" ? "selected" : ""
                    }
                    onClick={() => setRecebidaOuEnviada("Enviadas")}
                  >
                    Enviadas
                  </button>
                </div>

                <p>
                  Você tem {user?.connections_received.length} novas conexões
                </p>
                <div className="network_users">
                  {user?.connections_received.map((user) => (
                    <div className="network_users_info">
                      <div className="box_account">
                        <div className="box_profile_image">
                          <img
                            src={
                              user?.photoURL
                                ? user.photoURL
                                : "src/assets/profile_image.png"
                            }
                            alt="Foto de Perfil"
                          />
                        </div>
                        <div className="box_accounts_info">
                          <div className="box_info_name">
                            <h2 className="profile_name">
                              {user && user.name}
                            </h2>
                          </div>
                          <div className="box_info_cargo">
                            <h2 className="profile_cargo">
                              Cargo: {user && user.cargo}
                            </h2>
                          </div>
                          <div className="box_info_views">
                            <p className="views_today">
                              Conexões: {user.conexoes}
                            </p>
                            {/* <span className="new_followers">
                          +32 <MdArrowOutward />
                        </span> */}
                          </div>
                        </div>
                        <div className="network_users_btns">
                          <button className="network_users_btn">Aceitar</button>
                          <button className="network_users_btn">Recusar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="network_recebidas_enviadas">
                  <button
                    className={
                      RecebidaOuEnviada === "Recebidas" ? "selected" : ""
                    }
                    onClick={() => setRecebidaOuEnviada("Recebidas")}
                  >
                    Recebidas
                  </button>

                  <button
                    className={
                      RecebidaOuEnviada === "Enviadas" ? "selected" : ""
                    }
                    onClick={() => setRecebidaOuEnviada("Enviadas")}
                  >
                    Enviadas
                  </button>
                </div>

                <p>Você enviou {user.connections_send.length} conexões</p>
                <div className="network_users">
                  {user.connections_send.map((user) => (
                    <div className="network_users_info">
                      <div className="box_account">
                        <div className="box_profile_image">
                          <img
                            src={
                              user?.photoURL
                                ? user.photoURL
                                : "src/assets/profile_image.png"
                            }
                            alt="Foto de Perfil"
                          />
                        </div>
                        <div className="box_accounts_info">
                          <div className="box_info_name">
                            <h2 className="profile_name">
                              {user && user.name}
                            </h2>
                          </div>
                          <div className="box_info_cargo">
                            <h2 className="profile_cargo">
                              Cargo: {user && user.cargo}
                            </h2>
                          </div>
                          <div className="box_info_views">
                            <p className="views_today">
                              Conexões: {user.conexoes}
                            </p>
                            {/* <span className="new_followers">
                          +32 <MdArrowOutward />
                        </span> */}
                          </div>
                        </div>
                        <div className="network_users_btns">
                          <button className="network_users_btn">Aceitar</button>
                          <button className="network_users_btn">Recusar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          ) : selectedButton == "HashTags" ? (
            <>
              <p style={{ fontSize: "16px", marginTop: "70px" }}>
                Listagem de HashTags seguidas
              </p>

              <div className="grid-feed-list">
                {user.skills_tags.map((interest, index) => (
                  <div
                    className="grid-item"
                    key={index}
                    style={{ margin: "10px" }}
                  >
                    <div className="interest-info">
                      <span style={{ margin: "auto" }}>#{interest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Network;
