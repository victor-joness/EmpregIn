import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="top-container">
        <div className="box-logo">
          <span className="logo-title">Empreg</span>
          <img src="Images\logo.svg" alt="Logo da Aplicação" />
        </div>
        <div className="box-navigation">
          <h2 className="subtitle-navigation">Navegação</h2>
          <div className="infor-container">
            <p>
              <a href="">Sobre</a>
            </p>
          </div>
        </div>
        <div className="box-creations">
          <h2 className="subtitle-navigation">Criadores</h2>
          <div className="infor-container">
            <ul>
              <li>
                <a href="https://github.com/carlosedu757" target="_blank">
                  Carlos Eduardo
                </a>
              </li>
              <li>
                <a href="https://github.com/LaercioMelo" target="_blank">
                  Laércio Melo
                </a>
              </li>
              <li>
                <a href="https://github.com/MiguelFarias1" target="_blank">
                  Miguel Barbosa
                </a>
              </li>
              <li>
                <a href="https://github.com/SamuelLopess03" target="_blank">
                  Samuel Lopes
                </a>
              </li>
              <li>
                <a href="https://github.com/victor-joness" target="_blank">
                  Victor Mesquita
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <span className="logo-title">Empreg</span>
        <img src="Images\logo.svg" alt="Logo da Aplicação" />
        <span className="copyright">&copy; 2024</span>
      </div>
    </div>
  );
};

export default Footer;
