import React, {useEffect} from "react";
import Feed_Perfil from "../../Components/Feed_Perfil/Feed_Perfil";
import Feed_Main from "../../Components/Feed_Main/Feed_Main";
import Feed_Recomendacao from "../../Components/Feed_Recomendacao/Feed_Recomendacao";
import NavBar from "../../Components/NavBar/Navbar"

import "./Feed.css";

const Feed = (props) => {
  document.title = "Feed | EmpregIn";

  return (
    <div className="container">
      <NavBar />
      <div className="layout">
        <Feed_Main />
        <Feed_Perfil />
        <Feed_Recomendacao />
      </div>
    </div>
  );
};

export default Feed;
