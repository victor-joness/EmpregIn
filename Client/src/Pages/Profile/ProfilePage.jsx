import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/Navbar";
import "./ProfilePage.css";
import { BsPencilSquare } from "react-icons/bs";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { doc, updateDoc, getDoc } from "firebase/firestore";

import { db } from "../../../firebase";

const ProfilePage = () => {
  document.title = "Perfil | EmpregIn";

  const user = useSelector((state) => state.user);

  // Estado para abrir e fechar o modal de edição de perfil
  const [isEditing, setIsEditing] = useState(false);

  // Estado para abrir e fechar o modal de adição de experiência
  const [isAddingExperience, setIsAddingExperience] = useState(false);

  // Estado para abrir e fechar o modal de adição de educação
  const [isAddingEducation, setIsAddingEducation] = useState(false);

  // Estados para os valores do perfil
  const [profileName, setProfileName] = useState(user?.name);
  const [profileTitle, setProfileTitle] = useState(user?.qualification);
  const [aboutText, setAboutText] = useState(user?.description);
  const [profileImageUrl, setProfileImageUrl] = useState(
    user?.photoURL || "src/assets/profile_image.png"
  );

  const [bannerImageUrl, setBannerImageUrl] = useState(user?.photoBanner);

  // Estados temporários para as edições no modal
  const [tempProfileName, setTempProfileName] = useState(user?.name);
  const [tempProfileTitle, setTempProfileTitle] = useState(user?.qualification);
  const [tempAboutText, setTempAboutText] = useState(user?.description);
  const [tempProfileImageUrl, setTempProfileImageUrl] = useState(
    user?.photoURL
  );
  const [tempBannerImageUrl, setTempBannerImageUrl] = useState(
    user?.photoBanner
  );

  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      setProfileTitle(user.qualification);
      setAboutText(user.description);
      setProfileImageUrl(user.photoURL || "src/assets/profile_image.png");
      setBannerImageUrl(user.photoBanner || "src/assets/banner_image.png");
      setEducationList(user.education || "src/assets/chapeu.jpg");
      setExperienceList(user.experience || "src/assets/chapeu.jpg");
      setProjectList(user.projects || "src/assets/chapeu.jpg");
      setSkillList(user.hability || []);
    }
  }, [user]);

  const [tempProject, setTempProject] = useState({});
  const [tempSkill, setTempSkill] = useState({});
  const [tempPerfil, setTempPerfil] = useState({});
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isEditingSkill, setIsEditingSkill] = useState(false);

  // Estados para os valores do formulário de experiência
  const [experienceList, setExperienceList] = useState(user?.experience);

  const [educationList, setEducationList] = useState(user?.education);

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
  const [projectList, setProjectList] = useState(user?.projects);

  const [newProject, setNewProject] = useState({
    imageUrl: "",
    projectName: "",
    description: "",
  });

  const [skillList, setSkillList] = useState(user?.hability);

  const [newSkill, setNewSkill] = useState({
    skillName: "",
    proficiency: "",
  });

  const handleAddProject = () => {
    setNewProject({
      imageUrl: "",
      projectName: "",
      description: "",
    });
    setIsAddingProject(true);
  };

  const handleEditProject = (index) => {
    const project = projectList[index];
    setTempProject({
      imageUrl: project.imageUrl,
      projectName: project.projectName,
      description: project.description,
      index: index,
    });
    setIsEditingProject(true);
  };

  const handleSaveEditProject = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const updatedProjects = [...projectList];
        updatedProjects[tempProject.index] = tempProject;
        setProjectList(updatedProjects);

        await updateDoc(senderRef, { projects: updatedProjects });
      }
      setIsEditingProject(false);

      toast.success("Projeto editado com sucesso");
    } catch (error) {
      console.error("Error editar habilidade:", error);
    }
  };

  const handleSaveProject = async () => {
    setProjectList([...projectList, newProject]);
    setIsAddingProject(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();
        const updatedProjectSend = [...(senderData.projects || []), newProject];
        await updateDoc(senderRef, { projects: updatedProjectSend });
      }

      toast.success("Projeto adicionada com sucesso");
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const handleCloseProjectModal = () => {
    setIsAddingProject(false);
  };

  const handleDeleteProject = async (index) => {
    if (window.confirm("Deseja mesmo excluir isto?")) {
      const updatedProjects = projectList.filter((_, i) => i !== index);
      setProjectList(updatedProjects);
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();

        const updatedProjectsSend = (senderData.projects || []).filter(
          (_, i) => i !== index
        );

        await updateDoc(senderRef, { projects: updatedProjectsSend });

        toast.success("Projeto removido com sucesso");
      }
    } catch (error) {
      console.error("Error removing projeto:", error);
    }
  };

  const handleAddSkill = () => {
    setNewSkill({
      skillName: "",
      proficiency: "",
    });
    setIsAddingSkill(true);
  };

  const handleSaveSkill = async () => {
    setSkillList([...skillList, newSkill]);
    setIsAddingSkill(false);

    if (newSkill.proficiency === "") newSkill.proficiency = "Nenhum";

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();
        const updatedSkillSend = [...(senderData.hability || []), newSkill];
        await updateDoc(senderRef, { hability: updatedSkillSend });
      }

      toast.success("Habilidade adicionada com sucesso");
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const handleEditSkill = (index) => {
    const skill = skillList[index];

    setTempSkill({
      skillName: skill.skillName,
      proficiency: skill.proficiency,
      index: index,
    });

    setIsEditingSkill(true);
  };

  const handleSaveEditSkill = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const updatedSkills = [...skillList];
        updatedSkills[tempSkill.index] = tempSkill;
        setSkillList(updatedSkills);

        await updateDoc(senderRef, { hability: updatedSkills });
      }
      setIsEditingSkill(false);

      toast.success("Habilidade editada com sucesso");
    } catch (error) {
      console.error("Error editar habilidade:", error);
    }
  };

  const handleRemoveSkill = async (index) => {
    if (window.confirm("Deseja mesmo excluir isto?")) {
      const updatedSkills = skillList.filter((_, i) => i !== index);
      setSkillList(updatedSkills);
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();

        const updatedSkillSend = (senderData.hability || []).filter(
          (_, i) => i !== index
        );

        await updateDoc(senderRef, { hability: updatedSkillSend });

        toast.success("Habilidade removida com sucesso");
      }
    } catch (error) {
      console.error("Error removing hability:", error);
    }
  };

  const handleCloseSkillModal = () => {
    setIsAddingSkill(false);
  };

  const handleEditProfile = () => {
    setTempProfileName(profileName);
    setTempProfileTitle(profileTitle);
    setTempAboutText(aboutText);
    setTempProfileImageUrl(profileImageUrl);
    setTempBannerImageUrl(bannerImageUrl);
    setIsEditing(true);
  };

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

  const handleCloseModal = () => {
    setTempProfileName(profileName);
    setTempProfileTitle(profileTitle);
    setTempAboutText(aboutText);
    setTempProfileImageUrl(profileImageUrl);
    setTempBannerImageUrl(bannerImageUrl);
    setIsEditing(false);
  };

  const handleCloseExperienceModal = () => {
    setIsAddingExperience(false);
  };

  const handleSaveEditChanges = async () => {
    setProfileName(tempProfileName);
    setProfileTitle(tempProfileTitle);
    setAboutText(tempAboutText);
    setProfileImageUrl(tempProfileImageUrl);
    setBannerImageUrl(tempBannerImageUrl);

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        await updateDoc(senderRef, {
          name: tempProfileName,
          qualification: tempProfileTitle,
          description: tempAboutText,
          photoURL: tempProfileImageUrl,
          photoBanner: tempBannerImageUrl,
        });
      }

      setIsEditing(false);

      toast.success("Perfil editado com sucesso");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error editar habilidade:", error);
    }
  };

  const handleSaveExperience = async () => {
    setExperienceList([...experienceList, newExperience]);
    setIsAddingExperience(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();
        const updatedExperienceSend = [
          ...(senderData.experience || []),
          newExperience,
        ];
        await updateDoc(senderRef, { experience: updatedExperienceSend });
      }

      toast.success("Experiência adicionada com sucesso");
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const handleDeleteExperience = async (index) => {
    if (window.confirm("Deseja mesmo excluir isto?")) {
      const updatedExperienceList = experienceList.filter(
        (_, i) => i !== index
      );
      setExperienceList(updatedExperienceList);
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();

        const updatedExperienceSend = (senderData.experience || []).filter(
          (_, i) => i !== index
        );

        await updateDoc(senderRef, { experience: updatedExperienceSend });

        toast.success("Experiência removida com sucesso");
      }
    } catch (error) {
      console.error("Error removing experiencia:", error);
    }
  };

  const handleSaveEducation = async () => {
    setEducationList([...educationList, newEducation]);
    setIsAddingEducation(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();
        const updatedEducationSend = [
          ...(senderData.education || []),
          newEducation,
        ];
        await updateDoc(senderRef, { education: updatedEducationSend });
      }

      toast.success("Educação adicionada com sucesso");
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const handleCloseEducationModal = () => {
    setIsAddingEducation(false);
  };

  const handleAddEducation = () => {
    setNewEducation({
      imageUrl: "",
      instituteTitle: "",
      formationName: "",
      periodo: "",
    });
    setIsAddingEducation(true);
  };

  const handleDeleteEducation = async (index) => {
    if (window.confirm("Deseja mesmo excluir isto?")) {
      const updatedEducationList = educationList.filter((_, i) => i !== index);
      setEducationList(updatedEducationList);
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    try {
      const senderRef = doc(db, "users", userId);
      const senderDoc = await getDoc(senderRef);

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();

        const updatedEducationSend = (senderData.education || []).filter(
          (_, i) => i !== index
        );

        await updateDoc(senderRef, { education: updatedEducationSend });

        toast.success("Educação removida com sucesso");
      }
    } catch (error) {
      console.error("Error removing education:", error);
    }
  };

  const [showContactForm, setShowContactForm] = useState(false);
  const [contacts, setContacts] = useState([{ name: "", link: "" }]);
  const handleAddContact = () => {
    setContacts([...contacts, { name: "", link: "" }]);
  };

  const handleChangeContact = (index, event) => {
    const newContacts = [...contacts];
    newContacts[index][event.target.name] = event.target.value;
    setContacts(newContacts);
  };

  const handleSaveContacts = () => {
    console.log("Contatos salvos:", contacts);
    alert("Contatos salvos com sucesso!");
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
                <img
                  src="src/assets/editar.png"
                  alt="Edit Icon"
                  className="button-icon"
                />
                EDITAR PERFIL
              </button>
              <div className="profile-buttons">
                <button
                  className="contact-info-btn"
                  onClick={() => setShowContactForm(true)}
                >
                  Info de Contato
                </button>
                <span className="connections-count">
                  {user.connections.length} Conexões
                </span>
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
              <img
                src="src/assets/lapis.png"
                alt="Add Icon"
                className="button-icon"
              />
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
                <BsPencilSquare color="white" className="button-icon" />
                <p>Editar Projeto</p>
              </button>
              <button
                className="delete-project-btn"
                onClick={() => handleDeleteProject(index)}
              >
                Excluir
              </button>
            </div>
          ))}
        </section>

        <section className="skills-section">
          <div className="section-header">
            <h2>Skills & Habilidades</h2>
            <button
              className="add-experience-btn"
              onClick={() => handleAddSkill()}
            >
              <img src="src/assets/lapis.png" className="button-icon" alt="" />
              <p>Adicionar Habilidade</p>
            </button>
          </div>

          {skillList.map((skill, index) => (
            <div className="skill-card" key={index}>
              <p className="skill-name">{skill.skillName}</p>
              <span className="endorsement-count">{skill.proficiency}</span>
              <div className="endorsers"></div>
              <div className="skill-card-buttons">
                <button
                  className="edit-skill-btn"
                  onClick={() => handleEditSkill(index)}
                >
                  <BsPencilSquare color="white" className="button-icon" />
                  <p>Editar Habilidade</p>
                </button>
                <button
                  className="delete-skill-btn"
                  onClick={() => handleRemoveSkill(index)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="experience-section">
          <div className="section-header">
            <h2>Experiência</h2>
            <button
              className="add-experience-btn"
              onClick={handleAddExperience}
            >
              <img
                src="src/assets/lapis.png"
                alt="Edit Icon"
                className="button-icon"
              />
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
              <img
                src="src/assets/lapis.png"
                alt="Edit Icon"
                className="button-icon"
              />
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
                onChange={(e) =>
                  setTempProfileName(e.target.value.slice(0, 30))
                }
              />
              <label>Título (máx. 150 caracteres)</label>
              <input
                type="text"
                value={tempProfileTitle}
                onChange={(e) =>
                  setTempProfileTitle(e.target.value.slice(0, 150))
                }
              />
              <label>Sobre (máx. 1000 caracteres)</label>
              <textarea
                value={tempAboutText}
                onChange={(e) =>
                  setTempAboutText(e.target.value.slice(0, 1000))
                }
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
                <button onClick={handleSaveEditChanges}>Salvar</button>
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
                <button onClick={handleCloseProjectModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {isEditingProject && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Editar Projeto</h2>
              <label>URL da Imagem do Projeto</label>
              <input
                type="text"
                value={tempProject.imageUrl}
                onChange={(e) =>
                  setTempProject({ ...tempProject, imageUrl: e.target.value })
                }
              />
              <label>Nome do Projeto</label>
              <input
                type="text"
                value={tempProject.projectName}
                onChange={(e) =>
                  setTempProject({
                    ...tempProject,
                    projectName: e.target.value,
                  })
                }
              ></input>
              <label>Descrição</label>
              <textarea
                value={tempProject.description}
                onChange={(e) =>
                  setTempProject({
                    ...tempProject,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <div className="modal-buttons">
                <button
                  onClick={() => handleSaveEditProject()}
                  style={{ backgroundColor: "#067d71", color: "white" }}
                >
                  Salvar
                </button>
                <button
                  onClick={() => setIsEditingProject(false)}
                  style={{ backgroundColor: "#e57373", color: "white" }}
                >
                  Cancelar
                </button>
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
                onChange={(e) =>
                  setTempSkill({ ...tempSkill, skillName: e.target.value })
                }
              />
              <label>Proficiencia</label>
              <input
                type="text"
                value={tempSkill.proficiency}
                onChange={(e) =>
                  setTempSkill({ ...tempSkill, proficiency: e.target.value })
                }
              />
              <div className="modal-buttons">
                <button
                  onClick={() => handleSaveEditSkill()}
                  style={{ backgroundColor: "#067d71", color: "white" }}
                >
                  Salvar
                </button>
                <button
                  onClick={() => setIsEditingSkill(false)}
                  style={{ backgroundColor: "#e57373", color: "white" }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

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

        {isAddingExperience && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Adicionar Experiência</h2>
              <label>URL Imagem da Empresa</label>
              <input
                type="text"
                value={newExperience.imageUrl}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    imageUrl: e.target.value,
                  })
                }
              />
              <label>Nome da Empresa</label>
              <input
                type="text"
                value={newExperience.companyName}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    companyName: e.target.value,
                  })
                }
              />
              <label>Cargo</label>
              <input
                type="text"
                value={newExperience.jobTitle}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    jobTitle: e.target.value,
                  })
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
              <label>
                Descrição das principais atividades (máx. 200 caracteres)
              </label>
              <textarea
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value.slice(0, 200),
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
                  setNewEducation({
                    ...newEducation,
                    formationName: e.target.value,
                  })
                }
              />
              <label>Instituição</label>
              <input
                type="text"
                value={newEducation.instituteTitle} // Correção aqui
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    instituteTitle: e.target.value,
                  })
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
                <button onClick={() => handleSaveEducation()}>Salvar</button>{" "}
                {/* Correção aqui */}
                <button onClick={handleCloseEducationModal}>
                  Cancelar
                </button>{" "}
                {/* Correção aqui */}
              </div>
            </div>
          </div>
        )}

        {isAddingSkill && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Adicionar Habilidade</h2>
              <label>Nome da Habilidade</label>
              <input
                type="text"
                value={newSkill.skillName}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, skillName: e.target.value })
                }
              />
              <label>Proficiência</label>
              <select
                name="proficiency"
                value={newSkill.proficiency}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, proficiency: e.target.value })
                }
              >
                <option disabled value="">
                  Selecione
                </option>
                <option value="Básico">Básico</option>
                <option value="Médio">Médio</option>
                <option value="Avançado">Avançado</option>
              </select>

              <div className="modal-buttons">
                <button onClick={() => handleSaveSkill()}>Salvar</button>
                <button onClick={handleCloseSkillModal}>Cancelar</button>
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
