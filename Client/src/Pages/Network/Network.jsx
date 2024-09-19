import React, { useState } from "react";
import NavBar from "../../Components/NavBar/Navbar";
import "./Network.css";
import {
  FaUserFriends,
  FaUserPlus,
  FaUsers,
  FaUsersCog,
  FaRegBuilding,
  FaHashtag,
} from "react-icons/fa";

import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

import Footer from "../../Components/Footer/Footer";

const Network = ({}) => {
  document.title = "Rede | EmpregIn";

  const user = useSelector((state) => state.user);

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

  const HandleAcceptConnection = async (userId, currentUserId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const userData = userSnap.data();
  
        const currentUserRef = doc(db, "users", currentUserId);
        const currentUserSnap = await getDoc(currentUserRef);
        const currentUserData = currentUserSnap.data();
  
        // Certifique-se de que connections e connections_received são arrays
        const receivedConnections = currentUserData.connections_received || [];
        const currentConnections = currentUserData.connections || [];
  
        // Verifique se já existe conexão com o userId
        const alreadyConnected = currentConnections.some(
          
          (connection) => connection.id === userData.id
        );
  
        // Encontre a conexão na lista de connections_received
        const connectionToRemove = receivedConnections.find(
          (connection) => connection.id === userId
        );

        if (alreadyConnected) {
          toast("Você já está conectado com essa pessoa!");
  
          if (connectionToRemove) {
            // Remover manualmente a conexão da lista de connections_received
            const updatedReceivedConnections = receivedConnections.filter(
              (connection) => connection.id !== userId
            );
  
            // Atualiza a lista de conexões recebidas sem arrayRemove
            await updateDoc(currentUserRef, {
              connections_received: updatedReceivedConnections
            });
          }
  
          return; // Não continua com a aceitação, pois já estão conectados
        }
  
        // Se a conexão ainda não foi aceita, aceita e remove da lista de recebidos
        if (connectionToRemove) {
          const updatedReceivedConnections = receivedConnections.filter(
            (connection) => connection.id !== userId
          );
  
          await updateDoc(currentUserRef, {
            connections: [...currentConnections, userData], // Adiciona a nova conexão
            connections_received: updatedReceivedConnections // Remove da lista de recebidos
          });
  
          const userConnections = userData.connections || [];
          await updateDoc(userRef, {
            connections: [...userConnections, currentUserData], // Adiciona a conexão ao outro usuário
            connections_send: userData.connections_send.filter(
              (conn) => conn.id !== currentUserId
            ) // Remove da lista de enviados
          });
  
          toast.success("Conexão aceita!");
  
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.error("Conexão não encontrada em connections_received");
        }
      } else {
        console.error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao aceitar a conexão:", error);
    }
  };

  const HandleRejectConnection = async (userId, currentUserId) => {
    try {
      const currentUserRef = doc(db, "users", currentUserId);
      
      // Obter o documento atual
      const currentUserDoc = await getDoc(currentUserRef);
      
      if (currentUserDoc.exists()) {
        const connectionsReceived = currentUserDoc.data().connections_received || [];
        
        // Remover o userId da lista de connections_received
        const updatedConnections = connectionsReceived.filter(id => id == userId);
        // Atualizar o documento com a nova lista
        await updateDoc(currentUserRef, {
          connections_received: updatedConnections,
        });
  
        toast("Conexão rejeitada!");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao rejeitar a conexão:", error);
    }
  };

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
                  {user?.connections_received.map((userConnection) => (
                    <div className="network_users_info" key={userConnection.id}>
                      <div className="box_account">
                        <div className="box_profile_image">
                          <img
                            src={
                              userConnection?.photoURL
                                ? userConnection.photoURL
                                : "src/assets/profile_image.png"
                            }
                            alt="Foto de Perfil"
                          />
                        </div>
                        <div className="box_accounts_info">
                          <div className="box_info_name">
                            <h2 className="profile_name">
                              {userConnection.name}
                            </h2>
                          </div>
                          <div className="box_info_cargo">
                            {/* <h2 className="profile_cargo">
                              Qualificação: {user.qualification}
                            </h2> */}
                          </div>
                          <div className="box_info_views">
                            <p className="views_today">
                              Conexões: {userConnection.connections.length}
                            </p>
                            {/* <span className="new_followers">
                          +32 <MdArrowOutward />
                        </span> */}
                          </div>
                        </div>
                        <div className="network_users_btns">
                          <button
                            className="network_users_btn"
                            onClick={() =>
                              HandleAcceptConnection(
                                userConnection.id,
                                user.uid
                              )
                            }
                          >
                            Aceitar
                          </button>
                          <button
                            className="network_users_btn"
                            onClick={() =>
                              HandleRejectConnection(
                                userConnection.uid,
                                user.uid
                              )
                            }
                          >
                            Recusar
                          </button>
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
                    <div className="network_users_info" key={user.id}>
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
                            <h2 className="profile_name">Nome: {user.name}</h2>
                          </div>
                          <div className="box_info_cargo">
                            {/* <h2 className="profile_cargo">
                              Qualificação: {user.qualification}
                            </h2> */}
                          </div>
                          <div className="box_info_views">
                            <p className="views_today">
                              Conexões: {user.connections.length}
                            </p>
                            {/* <span className="new_followers">
                          +32 <MdArrowOutward />
                        </span> */}
                          </div>
                        </div>
                        {/* <div className="network_users_btns">
                          <button className="network_users_btn">Aceitar</button>
                          <button className="network_users_btn">Recusar</button>
                        </div> */}
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
