import React, { useState, useEffect } from 'react';
import './Main.css';
import { useHistory } from 'react-router-dom';
import parentImage from '../pic/bg1.jpg';
import logo from '../pic/flag.png'; 
import axios from 'axios';

import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrSchedules } from "react-icons/gr";
import { FaBullhorn } from "react-icons/fa6";
import { FaPeopleLine } from "react-icons/fa6";
import { FaSignOutAlt, FaBars, FaUserAlt } from "react-icons/fa";

function Main() {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/login'); 
  };

  const navigateTo = (route) => {
    history.push(route);
  };

  const menuItem = [
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
  
  let savedEmail = localStorage.getItem('email');
  const [dataProfil, setDataProfil] = useState({});

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
          {menuItem.map((item, index) => (
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

export default Main;
