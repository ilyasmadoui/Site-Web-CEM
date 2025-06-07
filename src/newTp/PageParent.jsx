import React, { useState,useEffect } from 'react';
import '../newTp/PageParent.css';
import './EleveParent.css'; // Import the CSS file
import parentImage from '../pic/parents.png';
import logo from '../pic/logo alger.jpg';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { GrPlan } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import axios from 'axios';

import
{
    FaTh,
    FaSignOutAlt,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
}from "react-icons/fa";
import { NavLink,useHistory } from 'react-router-dom';


const PageParent = ({children,email}) => {
    const [dataProfil, setDataProfil] = useState({});
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    let savedEmail = localStorage.getItem('email');

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


    const menuItem=[
        {   path: "/Accueil",
            name: "Accueil",
            icon:<IoHome />
        },
        {
            path:"/PageParent/EleveParent",
            name:"Mes enfants",
            icon:<FaTh/>
        },
        {
            path:"/PageParent/MonProfil",
            name:"Mon profil",
            icon:<FaUserAlt/>
        },
        {
            path:"/PageParent/FeuillesDePoints",
            name:"Relevés des notes",
            icon:<FaRegChartBar/>
        },
        {
            path:"PageParent/AbsencesDesEnfants",
            name:"Notification",
            icon:<IoMdNotifications/>
        },
        {
            path:"/PageParent/DemandesDeTransfert",
            name:"Des transferts",
            icon:<BiTransfer/>
        },
        {
            path:"/PageParent/Messenger",
            name:"Messagère",
            icon:<FaCommentAlt/>
        },
        {
            path:"/PageParent/GestionAnnonces1",
            name:"Gestion Annonces",
            icon:<GrAnnounce/>
        },
        {
            path:"/PageParent/Emploidetemp",
            name:"Emploie du temps",
            icon:<GrPlan/>
        }
    ]
    const [loggedInEmail, setLoggedInEmail] = useState(email);

    const history = useHistory();

  const logout = () => {
    localStorage.removeItem('email'); 
    setLoggedInEmail(''); 
    history.push('/Login');
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