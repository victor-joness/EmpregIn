import React, { useEffect, useState } from "react";
import "./Conexoes.css";

import NavBar from "../../Components/NavBar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";

const Conexoes = () => {
  const user = useSelector((state) => state.user);

  const [conections, setConections] = useState(user?.connections || []);

  useEffect(() => {
    setConections(user?.connections || []);
  }, [user]);

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <NavBar />
      <div className="container-conexoes">
        <h1 className="title-conexoes">
          {user?.connections.length > 0
            ? `Você tem ${user.connections.length} conexão${
                user.connections.length > 1 ? "ões" : ""
              }`
            : "Você não tem conexões no momento."}
        </h1>

        <div className="conexoes">
          {conections.length > 0 ? (
            conections.map((connection) => (
              <div className="conexoes-card" key={connection?.id}>
                <div className="conexoes-card-img">
                  <img
                    src={connection?.photoURL}
                    alt={connection?.name}
                    className="conexoes-img"
                  />
                </div>

                <div className="conexoes-card-info">
                  <h2 className="conexoes-card-name">{connection?.name}</h2>
                  <p className="conexoes-card-description">
                    {connection?.description || "Nenhuma descrição disponível"}
                  </p>

                  <div className="conexoes-card-email">
                    <strong>Email:</strong>{" "}
                    {connection?.email || "Não informado"}
                  </div>

                  <div className="conexoes-card-qualification">
                    <strong>Qualificação:</strong>{" "}
                    {connection?.qualification || "Não informado"}
                  </div>

                  <div className="conexoes-card-skills">
                    <strong style={{ fontSize: "1.5rem" }}>Skills:</strong>
                    {connection?.skills_tags?.length > 0 ? (
                      connection.skills_tags.map((tag) => (
                        <span key={tag} className="conexoes-skill-tag">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span>Não informado</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-connections">Nenhuma conexão para mostrar.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Conexoes;
