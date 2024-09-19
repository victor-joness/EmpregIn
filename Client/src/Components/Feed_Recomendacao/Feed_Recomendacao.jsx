import React, { useState, useEffect } from "react";
import "./Feed_Recomendacao.css";
import { FaGraduationCap, FaCode, FaDumbbell, FaChartLine, FaMusic, FaCamera, FaPalette, FaBriefcase, FaHeart, FaLaptopCode, FaGamepad, FaUtensils, FaPlane, FaBook, FaFilm, FaCar, FaLightbulb, FaBrush, FaMicrophone } from "react-icons/fa"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import { useSelector, useDispatch } from "react-redux";
import { updateUserSkills } from "../../App-config-teste/user-slice";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";

const Feed_Recomendacao = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const interests = [
    { name: "Ensino Superior", icon: <FaGraduationCap color="green"/> },
    { name: "Ensino Médio", icon: <FaGraduationCap color="green"/> },
    { name: "Ensino Básico", icon: <FaGraduationCap color="green"/> },
    { name: "Programação", icon: <FaCode color="green"/> },
    { name: "Fitness", icon: <FaDumbbell color="green"/> },
    { name: "Marketing", icon: <FaChartLine color="green"/> },
    { name: "Música", icon: <FaMusic color="green"/> },
    { name: "Fotografia", icon: <FaCamera color="green"/> },
    { name: "Arte", icon: <FaPalette color="green"/> },
    { name: "Carreira", icon: <FaBriefcase color="green"/> },
    { name: "Saúde", icon: <FaHeart color="green"/> },
    { name: "Desenvolvimento Web", icon: <FaLaptopCode color="green"/> },
    { name: "Jogos", icon: <FaGamepad color="green"/> },
    { name: "Culinária", icon: <FaUtensils color="green"/> },
    { name: "Viagens", icon: <FaPlane color="green"/> },
    { name: "Literatura", icon: <FaBook color="green"/> },
    { name: "Cinema", icon: <FaFilm color="green"/> },
    { name: "Automóveis", icon: <FaCar color="green"/> },
    { name: "Inovação", icon: <FaLightbulb color="green"/> },
    { name: "Design", icon: <FaBrush color="green"/> },
    { name: "Podcast", icon: <FaMicrophone color="green"/> }
  ];

  const [availableInterests, setAvailableInterests] = useState(interests);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filteredInterests = interests.filter(
        (interest) => !user?.skills_tags?.includes(interest.name)
      );
      setAvailableInterests(filteredInterests);
    }, 500);
  
    return () => clearTimeout(timeoutId);
  }, [user]);

  const handleInterestClick = async (interest) => {
    const userDocRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userDocRef, {
        skills_tags: arrayUnion(interest),
      });

      setAvailableInterests((prevInterests) =>
        prevInterests.filter((item) => item.name !== interest)
      );

      dispatch(updateUserSkills(interest));

      const localStorageUser = JSON.parse(localStorage.getItem('user')) || {};
      localStorageUser.skills_tags = [...(localStorageUser.skills_tags || []), interest];
      localStorage.setItem('user', JSON.stringify(localStorageUser));
      localStorage.removeItem('Data');

      toast.success(`Interesse '${interest}' adicionado com sucesso!`);
    } catch (error) {
      console.error("Erro ao atualizar os interesses: ", error);
    }
  };

  return (
    <div className="container_Feed_Recomendacao">
      <div className="follow-card">
        <div className="title">
          <h2>Interesses</h2>
          <img src="/Images/feed-icon.svg" alt="" />
        </div>

        <div className="grid-feed-list">
          {availableInterests.map((interest, index) => (
            <div className="grid-item" key={index}>
              <a href="/">
                <div className="avatar">{interest.icon}</div>
              </a>
              <div className="interest-info">
                <span>#{interest.name}</span>
                <button onClick={() => handleInterestClick(interest.name)}>
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
        <img src="https://www.ufc.br/images/_images/a_universidade/identidade_visual/brasao/brasao3_horizontal_cinza_72dpi.png" alt="Banner" />
      </div>
    </div>
  );
};

export default Feed_Recomendacao;
