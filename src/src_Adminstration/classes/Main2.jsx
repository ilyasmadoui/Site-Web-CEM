import React, { useState, useEffect } from 'react';
import './Main.css';
import { useHistory } from 'react-router-dom';
import parentImage from '../pic/bg1.jpg';
import logo from '../pic/flag.png'; 
import axios from 'axios';

import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { GiConfirmed } from "react-icons/gi";

import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrSchedules } from "react-icons/gr";
import { FaBullhorn } from "react-icons/fa6";
import { FaPeopleLine } from "react-icons/fa6";
import { FaSignOutAlt, FaBars, FaUserAlt } from "react-icons/fa";

function Main2() {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/login'); 
  };

  const navigateTo = (route) => {
    history.push(route);
  };

  const menuItem = [
    {
        path:"/DirecteurProfile/MonProfil",
        name:"MonProfil",
        icon:<FaUserAlt/>
    },
    {
        path:"/DirecteurProfile/demandes",
        name:"Liste des demmandes",
        icon:<SiGoogleclassroom />

    },
    {
        path:"/DirecteurProfile/ConformerEleves",
        name:"Conformer eleves",
        icon:<GiConfirmed />

    },
    {
        path:"/DirecteurProfile/comptes",
        name:"Gestion des comptes",
       icon:<FaChalkboardTeacher />


    },
    {
        path:"/DirecteurProfile/addEleve",
        name:"Ajouter élève",
        icon:<PiStudentBold />

    },
   
    {
        path:"/DirecteurProfile/stat",
        name:"Statistiques",
        icon:<FaChalkboardTeacher />

    },
    {
        path:"/DirecteurProfile/listDesEleves",
        name:"Liste des eleves",
        icon:<PiStudentBold />

    },
   
    {
        path:"/DirecteurProfile/VoirAnnonces",
        name:"Les annonces",
        icon: <FaBullhorn/>

    },
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

export default Main2;
