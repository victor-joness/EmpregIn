const Footer = () => {
  return (
    <div className="footer-container">
      <div className="box-logo">
        <img src="Images\logo.svg" alt="Logo da Aplicação" />
        <span className="logo-title">EmpregIn</span>
      </div>
      <div className="box-navigation">
        <h2 className="subtitle-navigation">Navegação</h2>
        <div className="infor-container">
          <p>
            <a href="">About</a>
          </p>
        </div>
      </div>
      <div className="box-creations">
        <h2 className="subtitle-navigation">Criadores</h2>
        <div className="infor-container">
          <ul>
            <li>
              <a href="https://github.com/carlosedu757">Carlos Eduardo</a>
            </li>
            <li>
              <a href="https://github.com/LaercioMelo">Laércio Melo</a>
            </li>
            <li>
              <a href="https://github.com/MiguelFarias1">Miguel Barbosa</a>
            </li>
            <li>
              <a href="https://github.com/SamuelLopess03">Samuel Lopes</a>
            </li>
            <li>
              <a href="https://github.com/victor-joness">Victor Mesquita</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
