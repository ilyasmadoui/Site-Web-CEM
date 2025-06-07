import React, { useState, useEffect } from 'react';
import '../src_Adminstration/classes/Main.css';
import { useHistory } from 'react-router-dom';
import parentImage from '../pic/parents.png';
import logo from '../src_Adminstration/pic/flag.png'; 
import axios from 'axios';
import { IoHome } from "react-icons/io5";

import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher, FaTh } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrSchedules } from "react-icons/gr";
import { FaBullhorn } from "react-icons/fa6";
import { FaPeopleLine } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { GrPlan } from "react-icons/gr";
import { FaSignOutAlt, FaUserAlt, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineAlternateEmail } from "react-icons/md";

function Main1() {
  const history = useHistory();
  const [dataProfil, setDataProfil] = useState({});
  const [itemMenu, setItemsMenu] = useState([]);
  const savedEmail = localStorage.getItem('email');

  const handleLogout = () => {
    history.push('/login'); 
  };

  const navigateTo = (route) => {
    history.push(route);
  };

  const menuItemDirecteur = [
    { path:"/DirecteurProfile/MonProfil", name:"MonProfil", icon:<FaUserAlt/> },
    { path:"/DirecteurProfile/demandes", name:"Liste des demmandes", icon:<SiGoogleclassroom /> },
    { path:"/DirecteurProfile/ConformerEleves", name:"Conformer eleves", icon:<GiConfirmed /> },
    { path:"/DirecteurProfile/comptes", name:"Gestion des comptes", icon:<FaChalkboardTeacher /> },
    { path:"/DirecteurProfile/addEleve", name:"Ajouter élève", icon:<PiStudentBold /> },
    { path:"/DirecteurProfile/stat", name:"Statistiques", icon:<FaChalkboardTeacher /> },
    { path:"/DirecteurProfile/listDesEleves", name:"Liste des eleves", icon:<PiStudentBold /> },
    { path:"/DirecteurProfile/VoirAnnonces", name:"Les annonces", icon: <FaBullhorn/> },
  ];

  const menuItemAdmin = [
    { path: "/Administration/MonProfil", name: "Ma profile", icon: <FaUserAlt /> },
    { path: "/Administration/listClasses", name: "Liste des classes", icon: <SiGoogleclassroom /> },
    { path: "/Administration/emploisDeTemps", name: "Les emplois de temps", icon: <GrSchedules /> },
    { path: "/Administration/listDesEnsigiants", name: "Liste des Ensigiants", icon: <FaChalkboardTeacher /> },
    { path: "/Administration/listDesEleves", name: "Liste des eleves", icon: <PiStudentBold /> },
    { path: "/Administration/GestionNotification", name: "Gestion de notification", icon: <FaBullhorn /> },
    { path: "/Administration/ListeDeseleves2", name: "Gestion d'Discipline", icon: <FaBullhorn /> },
    { path: "/Administration/gestionAnnonces", name: "Gestion d'annonces", icon: <FaBullhorn /> },
    { path: "/Administration/gestionAbsence", name: "Gestion d'absence", icon: <FaPeopleLine /> },
  ];

  const menuItemEsign = [
    { path:"/PageEnseignat/EleveEnseignat", name:"EleveEnseignat", icon:<FaTh/> },
    { path:"/PageEnseignat/MonProfil", name:"MonProfil", icon:<FaUserAlt/> },
    { path:"/PageEnseignat/EmailParent", name:"EmailParent", icon:<MdOutlineAlternateEmail/> },
    { path:"/PageEnseignat/GestionAnnonces1", name:"GestionAnnonces1", icon:<GrAnnounce/> },
    { path:"/PageEnseignat/PointEleves", name:"PointEleves", icon:<FaRegChartBar/> },
    { path:"PageEnseignat/Messenger", name:"Messenger", icon:<FaCommentAlt/> }
  ];

  const menuItemParent = [
    { path:"/PageParent/EleveParent", name:"Mes enfants", icon:<FaTh/> },
    { path:"/PageParent/MonProfil", name:"Mon profil", icon:<FaUserAlt/> },
    { path:"/PageParent/FeuillesDePoints", name:"Relevés des notes", icon:<FaRegChartBar/> },
    { path:"PageParent/AbsencesDesEnfants", name:"Notification", icon:<IoMdNotifications/> },
    { path:"/PageParent/DemandesDeTransfert", name:"Des transferts", icon:<BiTransfer/> },
    { path:"/PageParent/Messenger", name:"Messagère", icon:<FaCommentAlt/> },
    { path:"/PageParent/GestionAnnonces1", name:"Gestion Annonces", icon:<GrAnnounce/> },
    { path:"/PageParent/Emploidetemp", name:"Emploie du temps", icon:<GrPlan/> },
  ];
  
  useEffect(() => {
    if (savedEmail) {
      fetchProfileData(savedEmail);
    }
  }, [savedEmail]);

  const fetchProfileData = async (email) => {
    try {
      const response = await axios.get('http://localhost:5000/compteInfo', {
        params: { email }
      });
      setDataProfil(response.data.result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    const getRoleAccount = () => {
      switch (dataProfil.role) {
        case 1:
          setItemsMenu(menuItemAdmin);
          break;
        case 2:
          setItemsMenu(menuItemEsign);
          break;
        case 3:
          setItemsMenu(menuItemParent);
          break;
        default:
          setItemsMenu(menuItemDirecteur);
          break;

      }
    };


    if (dataProfil && dataProfil.role !== undefined) {
      getRoleAccount();
    }
  }, [dataProfil]);





  return (
    <div className="App">
      <div className="allcontent">
        <div className="headerApp">
          <div className="logoutApp">
            <img
              src={`http://localhost:5000/images/${dataProfil.photoProfil?.replace('public\\images\\', '')}`}
              alt="Profile"
              className="accountIconApp"
            />
            <div className="logout-buttonApp">
              <FaSignOutAlt />
              <button onClick={handleLogout}>Déconnexion</button>
            </div>
          </div>
          <span className="title">La page d'accueil de Madrassaty</span>
          <img src={logo} alt="Logo Alger" className="logoApp" />
        </div>
        <div className="buttons-containerApp">
          <div className="buttonsApp">
            {itemMenu.map((item, index) => (
              <button className="buttonApp" key={index} onClick={() => navigateTo(item.path)}>
                {item.icon}
                <h1>{item.name}</h1>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main1;
