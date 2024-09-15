import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/Navbar";
import "./ProfilePage.css";

const ProfilePage = ({ user }) => {
  document.title = "Perfil | EmpregIn";

  // Estado para abrir e fechar o modal de edição de perfil
  const [isEditing, setIsEditing] = useState(false);

  // Estado para abrir e fechar o modal de adição de experiência
  const [isAddingExperience, setIsAddingExperience] = useState(false);

  // Estado para abrir e fechar o modal de adição de educação
  const [isAddingEducation, setIsAddingEducation] = useState(false);

  // Estados para os valores do perfil
  const [profileName, setProfileName] = useState("Laércio Levi");
  const [profileTitle, setProfileTitle] = useState("Freelance UX/UI Designer");
  const [aboutText, setAboutText] = useState(
    "I'm more experienced in eCommerce web projects and mobile banking apps, but I also like to work with creative projects, such as landing pages or unusual corporate websites."
  );
  const [profileImageUrl, setProfileImageUrl] = useState(user?.photoURL || "src/assets/profile_image.png");
  const [bannerImageUrl, setBannerImageUrl] = useState("src/assets/banner.jpg");

  // Estados temporários para as edições no modal
  const [tempProfileName, setTempProfileName] = useState("");
  const [tempProfileTitle, setTempProfileTitle] = useState("");
  const [tempAboutText, setTempAboutText] = useState("");
  const [tempProfileImageUrl, setTempProfileImageUrl] = useState("");
  const [tempBannerImageUrl, setTempBannerImageUrl] = useState("");

  const [tempProject, setTempProject] = useState({});
const [tempSkill, setTempSkill] = useState({});
const [isAddingProject, setIsAddingProject] = useState(false);
const [isEditingProject, setIsEditingProject] = useState(false);
const [isAddingSkill, setIsAddingSkill] = useState(false);
const [isEditingSkill, setIsEditingSkill] = useState(false);


  // Estados para os valores do formulário de experiência
const [experienceList, setExperienceList] = useState([
  {
    imageUrl: "src/assets/predio.png",
    jobTitle: "Freelance UX/UI designer",
    companyName: "Self Employed | Around the world",
    period: "Jun 2016 – Present",
    description:
      "Work with clients and web studios as a freelancer. Work in areas such as eCommerce web projects, creative landing pages, iOS and Android apps, and corporate websites.",
  },
]);

const [educationList, setEducationList] = useState([
  {
    imageUrl: "src/assets/chapeu.jpg",
    instituteTitle: "Freelance UX/UI designer",
    formationName: "Self Employed | Around the world",
    periodo: "Jun 2016 – Present",
  },
]);

const [newExperience, setNewExperience] = useState({
  imageUrl: "",
  jobTitle: "",
  companyName: "",
  period: "",
  description: "",
});

const [newEducation, setNewEducation] = useState({
  imageUrl: "",
  instituteTitle: "",
  formationName: "",
  periodo: "",
});

// Estados para os valores dos projetos
const [projectList, setProjectList] = useState([
  {
    imageUrl: "src/assets/projeto.png",
    projectName: "E-commerce Website",
    description: "Developed a fully functional e-commerce platform with payment integration and user management.",
  },
  {
    imageUrl: "src/assets/projeto.png",
    projectName: "Mobile App for Fitness",
    description: "Created a fitness tracking app with workout plans and progress tracking features.",
  },
]);

const [newProject, setNewProject] = useState({
  imageUrl: "",
  projectName: "",
  description: "",
});

// Estados para os valores das habilidades
const [skillList, setSkillList] = useState([
  {
    skillName: "JavaScript",
    proficiency: "Advanced",
  },
  {
    skillName: "React",
    proficiency: "Intermediate",
  },
]);

const [newSkill, setNewSkill] = useState({
  skillName: "",
  proficiency: "",
});

// Função para abrir o modal de adicionar projeto
const handleAddProject = () => {
  setNewProject({
    imageUrl: "",
    projectName: "",
    description: "",
  });
  setIsAddingProject(true);
};

// Função para abrir o modal de editar projeto
const handleEditProject = (index) => {
  const project = projectList[index];
  setTempProject({
    imageUrl: project.imageUrl,
    projectName: project.projectName,
    description: project.description,
  });
  setIsEditingProject(true);
};

// Função para salvar o novo projeto
const handleSaveProject = () => {
  if (isEditingProject) {
    // Atualiza o projeto existente
    const updatedProjects = projectList.map((project, index) =>
      index === tempProjectIndex ? tempProject : project
    );
    setProjectList(updatedProjects);
  } else {
    // Adiciona um novo projeto
    setProjectList([...projectList, newProject]);
  }
  setIsAddingProject(false);
  setIsEditingProject(false);
};

// Função para remover projeto
const handleRemoveProject = (index) => {
  const updatedProjects = projectList.filter((_, i) => i !== index);
  setProjectList(updatedProjects);
};

// Função para abrir o modal de adicionar habilidade
const handleAddSkill = () => {
  setNewSkill({
    skillName: "",
    proficiency: "",
  });
  setIsAddingSkill(true);
};

// Função para abrir o modal de editar habilidade
const handleEditSkill = (index) => {
  const skill = skillList[index];
  setTempSkill({
    skillName: skill.skillName,
    proficiency: skill.proficiency,
  });
  setIsEditingSkill(true); // Abre o modal de edição de habilidade
};


// Função para remover habilidade
const handleRemoveSkill = (index) => {
  const updatedSkills = skillList.filter((_, i) => i !== index);
  setSkillList(updatedSkills);
};


  // Função para abrir o modal de edição de perfil
  const handleEditProfile = () => {
    setTempProfileName(profileName);
    setTempProfileTitle(profileTitle);
    setTempAboutText(aboutText);
    setTempProfileImageUrl(profileImageUrl);
    setTempBannerImageUrl(bannerImageUrl);
    setIsEditing(true);
  };

  // Função para abrir o modal de adicionar experiência
  const handleAddExperience = () => {
    setNewExperience({
      imageUrl: "",
      jobTitle: "",
      companyName: "",
      period: "",
      description: "",
    });
    setIsAddingExperience(true);
  };

  // Função para fechar o modal de edição de perfil
  const handleCloseModal = () => {
    setTempProfileName(profileName);
    setTempProfileTitle(profileTitle);
    setTempAboutText(aboutText);
    setTempProfileImageUrl(profileImageUrl);
    setTempBannerImageUrl(bannerImageUrl);
    setIsEditing(false);
  };

  // Função para fechar o modal de adicionar experiência
  const handleCloseExperienceModal = () => {
    setIsAddingExperience(false);
  };

  // Função para salvar as alterações do perfil
  const handleSaveChanges = () => {
    setProfileName(tempProfileName);
    setProfileTitle(tempProfileTitle);
    setAboutText(tempAboutText);
    setProfileImageUrl(tempProfileImageUrl);
    setBannerImageUrl(tempBannerImageUrl);
    setIsEditing(false);
  };

  // Função para salvar a nova experiência
  const handleSaveExperience = () => {
    setExperienceList([...experienceList, newExperience]);
    setIsAddingExperience(false);
  };

  // Função para excluir uma experiência
  const handleDeleteExperience = (index) => {
    if (window.confirm("Deseja mesmo excluir isto?")) {
      const updatedExperienceList = experienceList.filter((_, i) => i !== index);
      setExperienceList(updatedExperienceList);
    }
  };

  // Função para salvar a nova educação
  const handleSaveEducation = () => {
    setEducationList([...educationList, newEducation]);
    setIsAddingEducation(false);
  };

  // Função para fechar o modal de adicionar educação
  const handleCloseEducationModal = () => {
    setIsAddingEducation(false);
  };

  // Função para abrir o modal de adicionar educação
  const handleAddEducation = () => {
    setNewEducation({
      imageUrl: "",
      instituteTitle: "",
      formationName: "",
      periodo: "",
    });
    setIsAddingEducation(true); 
  };

  const handleDeleteEducation = (index) => {
    if (window.confirm("Deseja mesmo excluir isto?")) {
      const updatedEducationList = educationList.filter((_, i) => i !== index);
      setEducationList(updatedEducationList);
    }
  };

  const [showContactForm, setShowContactForm] = useState(false);
  const [contacts, setContacts] = useState([{ name: '', link: '' }]);
  const handleAddContact = () => {
    setContacts([...contacts, { name: '', link: '' }]);
  };

  const handleChangeContact = (index, event) => {
    const newContacts = [...contacts];
    newContacts[index][event.target.name] = event.target.value;
    setContacts(newContacts);
  };

  const handleSaveContacts = () => {
    console.log('Contatos salvos:', contacts);
    alert('Contatos salvos com sucesso!');
    setShowContactForm(false);
  };

  const handleCancelContacts = () => {
    setShowContactForm(false);
  };

  return (
    <div className="profile-container">
      <NavBar />
      <div className="profile-layout">
        <header className="profile-header">
          <div className="cover-photo">
            <img src={bannerImageUrl} alt="Cover" />
          </div>
          <div className="profile-info-container">
            <div
              className="profile-image"
              onClick={() => (window.location.href = "/profile")}
            >
              <img src={profileImageUrl} alt="Profile" />
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{profileName}</h1>
              <p className="profile-title">{profileTitle}</p>
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                <img src="src/assets/editar.png" alt="Edit Icon" className="button-icon" />
                EDITAR PERFIL
              </button>
              <div className="profile-buttons">
              <button className="contact-info-btn" onClick={() => setShowContactForm(true)}>
                  Info de Contato
                </button>
                <span className="connections-count">1,043 conexões</span>
              </div>
            </div>
          </div>
        </header>

        <section className="about-section">
          <h2>Sobre</h2>
          <p>{aboutText}</p>
          <div className="see-more">
            <a href="#" className="see-more">
              VEJA MAIS
            </a>
          </div>
        </section>

        <section className="projects-section">
  <div className="section-header">
    <h2>Projetos</h2>
    <button className="add-project-btn" onClick={handleAddProject}>
      <img src="src/assets/lapis.png" alt="Add Icon" className="button-icon" />
      Adicionar Projeto
    </button>
  </div>

  {projectList.map((project, index) => (
    <div className="project-item" key={index}>
      <div className="project-logo">
        <img src={project.imageUrl} alt={project.projectName} />
      </div>
      <div className="project-details">
        <h3>{project.projectName}</h3>
        <p>{project.description}</p>
      </div>
      <button
        className="edit-project-btn"
        onClick={() => handleEditProject(index)}
      >
        <img src="src/assets/editar.png" alt="Edit Icon" className="button-icon" />
        Editar Projeto
      </button>
      <button
        className="delete-project-btn"
        onClick={() => handleDeleteProject(index)}
      >
        Excluir
      </button>
    </div>
  ))}

  <a href="#" className="show-all">SHOW ALL (12)</a>
</section>



        {/* Skills & Endorsements Section */}
        <section className="skills-section">
  <div className="section-header">
    <h2>Skills & Endorsements</h2>
    <button className="add-experience-btn" onClick={handleAddSkill}>
      <img src="src/assets/adicionar.png" alt="Edit Icon" className="button-icon" />
      Adicionar Habilidade
    </button>
  </div>

  {skillList.map((skill, index) => (
    <div className="skill-card" key={index}>
      <p>{skill.skillName}</p>
      <span className="endorsement-count">{skill.proficiency}</span>
      <div className="endorsers">
        {/* Add endorsers' avatars */}
      </div>
      <button
        className="edit-skill-btn"
        onClick={() => handleEditSkill(index)}
      >
        <img src="src/assets/editar.png" alt="Edit Icon" className="button-icon" />
        Editar Habilidade
      </button>
      <button
        className="delete-skill-btn"
        onClick={() => handleDeleteSkill(index)}
      >
        Excluir
      </button>
    </div>
  ))}

  <a href="#" className="show-all">SHOW ALL (17)</a>
</section>


        <section className="experience-section">
          <div className="section-header">
            <h2>Experiência</h2>
            <button className="add-experience-btn" onClick={handleAddExperience}>
              <img src="src/assets/lapis.png" alt="Edit Icon" className="button-icon" />
              Adicionar
            </button>
          </div>

          {experienceList.map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-logo">
                <img src={experience.imageUrl} alt={experience.jobTitle} />
              </div>
              <div className="experience-details">
                <h3>{experience.jobTitle}</h3>
                <p className="empresa-nome">{experience.companyName}</p>
                <p className="data-funcao">{experience.period}</p>
                <p className="descricao">{experience.description}</p>
              </div>
              <button
                className="delete-experience-btn"
                onClick={() => handleDeleteExperience(index)}
              >
                Excluir
              </button>
            </div>
          ))}
        </section>

        <section className="education-section">
  <div className="section-header">
    <h2>Educação</h2>
    <button className="add-education-btn" onClick={handleAddEducation}>
      <img src="src/assets/lapis.png" alt="Edit Icon" className="button-icon" />
      Adicionar
    </button>
  </div>
  
  {educationList.map((edu, index) => (
    <div key={index} className="education-item">
      <div className="education-logo">
        <img src={edu.imageUrl} alt={edu.instituteTitle} />
      </div>
      <div className="education-details">
        <h3>{edu.instituteTitle}</h3>
        <p className="formacao-nome">{edu.formationName}</p>
        <p className="data-funcao">{edu.periodo}</p>
      </div>
      <button
                className="delete-experience-btn"
                onClick={() => handleDeleteEducation(index)}
              >
                Excluir
              </button>
    </div>
  ))}
</section>

        {/* Modal de Edição de Perfil */}
        {isEditing && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Editar Perfil</h2>
              <label>Nome (máx. 30 caracteres)</label>
              <input
                type="text"
                value={tempProfileName}
                onChange={(e) => setTempProfileName(e.target.value.slice(0, 30))}
              />
              <label>Título (máx. 150 caracteres)</label>
              <input
                type="text"
                value={tempProfileTitle}
                onChange={(e) => setTempProfileTitle(e.target.value.slice(0, 150))}
              />
              <label>Sobre (máx. 1000 caracteres)</label>
              <textarea
                value={tempAboutText}
                onChange={(e) => setTempAboutText(e.target.value.slice(0, 1000))}
              />
              <label>URL da Imagem de Perfil</label>
              <input
                type="text"
                value={tempProfileImageUrl}
                onChange={(e) => setTempProfileImageUrl(e.target.value)}
              />
              <label>URL da Imagem do Banner</label>
              <input
                type="text"
                value={tempBannerImageUrl}
                onChange={(e) => setTempBannerImageUrl(e.target.value)}
              />
              <div className="modal-buttons">
                <button onClick={handleSaveChanges}>Salvar</button>
                <button onClick={handleCloseModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

{isAddingProject && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Adicionar Projeto</h2>
      <label>URL da Imagem do Projeto</label>
      <input
        type="text"
        value={newProject.imageUrl}
        onChange={(e) =>
          setNewProject({ ...newProject, imageUrl: e.target.value })
        }
      />
      <label>Nome do Projeto</label>
      <input
        type="text"
        value={newProject.projectName}
        onChange={(e) =>
          setNewProject({ ...newProject, projectName: e.target.value })
        }
      />
      <label>Descrição</label>
      <textarea
        value={newProject.description}
        onChange={(e) =>
          setNewProject({
            ...newProject,
            description: e.target.value.slice(0, 200), // Limite de 200 caracteres
          })
        }
      />
      <div className="modal-buttons">
        <button onClick={handleSaveProject}>Salvar</button>
        <button onClick={handleCloseProject}>Cancelar</button>
      </div>
    </div>
  </div>
)}

{isEditingSkill && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Editar Habilidade</h2>
      <label>Nome da Habilidade</label>
      <input
        type="text"
        value={tempSkill.skillName}
        onChange={(e) => setTempSkill({ ...tempSkill, skillName: e.target.value })}
      />
      <label>Proficiencia</label>
      <input
        type="text"
        value={tempSkill.proficiency}
        onChange={(e) => setTempSkill({ ...tempSkill, proficiency: e.target.value })}
      />
      <div className="modal-buttons">
        <button onClick={() => setIsEditingSkill(false)}>Cancelar</button>
        <button onClick={handleSaveSkill}>Salvar</button>
      </div>
    </div>
  </div>
)}
        

         {/* Formulário de Contato */}
         {showContactForm && (
          <div className="contact-form-overlay">
            <div className="contact-form-content">
              <h1>Informações de Contato</h1>
              {contacts.map((contact, index) => (
                <div className="contact-entry" key={index}>
                  <label htmlFor={`name-${index}`}>Nome:</label>
                  <input
                    type="text"
                    id={`name-${index}`}
                    name="name"
                    value={contact.name}
                    onChange={(event) => handleChangeContact(index, event)}
                  />
                  <label htmlFor={`link-${index}`}>Link:</label>
                  <input
                    type="text"
                    id={`link-${index}`}
                    name="link"
                    value={contact.link}
                    onChange={(event) => handleChangeContact(index, event)}
                  />
                </div>
              ))}
              <button className="add-contact-btn" onClick={handleAddContact}>
                Adicionar Outro Contato
              </button>
              <div className="contact-form-buttons">
                <button onClick={handleSaveContacts}>Salvar</button>
                <button onClick={handleCancelContacts}>Cancelar</button>
              </div>
            </div>
          </div>
        )}


        {/* Modal de Adição de Experiência */}
        {isAddingExperience && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Adicionar Experiência</h2>
              <label>URL Imagem da Empresa</label>
              <input
                type="text"
                value={newExperience.imageUrl}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, imageUrl: e.target.value })
                }
              />
              <label>Nome da Empresa</label>
              <input
                type="text"
                value={newExperience.companyName}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, companyName: e.target.value })
                }
              />
              <label>Cargo</label>
              <input
                type="text"
                value={newExperience.jobTitle}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, jobTitle: e.target.value })
                }
              />
              <label>Período (ex: Jun 2018 - Abr 2020)</label>
              <input
                type="text"
                value={newExperience.period}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, period: e.target.value })
                }
              />
              <label>Descrição das principais atividades (máx. 100 caracteres)</label>
              <textarea
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value.slice(0, 100),
                  })
                }
              />
              <div className="modal-buttons">
                <button onClick={handleSaveExperience}>Salvar</button>
                <button onClick={handleCloseExperienceModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Adição de Educação */}
        {isAddingEducation && ( // Correção aqui
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Adicionar Educação</h2>
              <label>URL Imagem da instituição</label>
              <input
                type="text"
                value={newEducation.imageUrl}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, imageUrl: e.target.value })
                }
              />
              <label>Formação</label>
              <input
                type="text"
                value={newEducation.formationName} // Correção aqui
                onChange={(e) =>
                  setNewEducation({ ...newEducation, formationName: e.target.value })
                }
              />
              <label>Instituição</label>
              <input
                type="text"
                value={newEducation.instituteTitle} // Correção aqui
                onChange={(e) =>
                  setNewEducation({ ...newEducation, instituteTitle: e.target.value })
                }
              />
              <label>Período (ex: Jun 2018 - Abr 2020)</label>
              <input
                type="text"
                value={newEducation.periodo} // Correção aqui
                onChange={(e) =>
                  setNewEducation({ ...newEducation, periodo: e.target.value })
                }
              />
              <div className="modal-buttons">
                <button onClick={handleSaveEducation}>Salvar</button> {/* Correção aqui */}
                <button onClick={handleCloseEducationModal}>Cancelar</button> {/* Correção aqui */}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
