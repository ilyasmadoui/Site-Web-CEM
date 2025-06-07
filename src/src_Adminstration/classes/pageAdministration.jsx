import React, { useState, useEffect } from 'react';
import '../classes/PageAdministration.css';
import parentImage from '../pic/director.png';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrSchedules } from "react-icons/gr";
import { FaBullhorn } from "react-icons/fa6";
import { FaPeopleLine } from "react-icons/fa6";
import { FaSignOutAlt, FaBars, FaUserAlt } from "react-icons/fa";
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoHome } from "react-icons/io5";
import { RiNotification2Fill } from "react-icons/ri";
import { RiFileWarningFill } from "react-icons/ri";

const PageParent = ({ children, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataCompt, setDataCompt] = useState({});
  const [loggedInEmail, setLoggedInEmail] = useState(email);

  
 

  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    { path: "/Accueil", name: "Accueil", icon:<IoHome />
  },
    { path: "/Administration/MonProfil", name: "Ma profile", icon:<FaUserAlt/>},
    { path: "/Administration/listClasses", name: "Liste des classes", icon: <SiGoogleclassroom /> },   
    { path: "/Administration/emploisDeTemps", name: "Les emplois de temps", icon: <GrSchedules /> },
    { path: "/Administration/listDesEnsigiants", name: "Liste des Ensigiants", icon: <FaChalkboardTeacher /> },
    { path: "/Administration/listDesEleves", name: "Liste des eleves", icon: <PiStudentBold /> },
    { path: "/Administration/GestionNotification", name: "Gestion de notification", icon: <RiNotification2Fill />},
    { path: "/Administration/ListeDeseleves2", name: "Gestion d'Discipline", icon: <RiFileWarningFill />},
    { path: "/Administration/gestionAnnonces", name: "Gestion d'annonces", icon: <FaBullhorn /> },
    { path: "/Administration/gestionAbsence", name: "Gestion d'absence", icon: <FaPeopleLine /> },
  ];

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('emailAdministration'); 
    setLoggedInEmail(''); 
    history.push('/Login');
  };
 
  let savedEmail = localStorage.getItem('emailAdministration');
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
    <div className="container">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">         
        <div className="top_section">
        <img style={{ display: isOpen ? "block" : "none" }} className="accountIconParent" 
                            src={`http://localhost:5000/images/${dataProfil.photoProfil?.replace('public\\images\\', '')}`}
                            alt="Profile"
                        />
          <div style={{ marginLeft: isOpen ? "120px" : "0px" }} className="bars">
            {isOpen ? (
              <HiBars3BottomRight onClick={toggle} />
            ) : (
              <FaBars onClick={toggle} />
            )}
          </div>
        </div>
        
        {menuItem.map((item, index) => (
          <NavLink to={{ pathname: item.path, state: { email: loggedInEmail } }} key={index} className="link" activeclassName="active">
            <div className="iconNav">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_textNav">{item.name}</div>
          </NavLink>
        ))}
        <div className="link" onClick={logout}> {/* Logout button separately */}
          <FaSignOutAlt className="iconNav" />
          <div style={{ display: isOpen ? "block" : "none" }} className="link_textNav">Se déconnecter</div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default PageParent;
