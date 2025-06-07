import React, { useState, useEffect } from 'react';
import '../src_Adminstration/classes/Main.css';
import { useHistory } from 'react-router-dom';
import profImage from '../pic/teacher.png';
import logo from '../src_Adminstration/pic/flag.png'; 
import axios from 'axios';
import { IoHome } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher,FaTh } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrSchedules } from "react-icons/gr";
import { FaBullhorn } from "react-icons/fa6";
import { FaPeopleLine } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { GrPlan } from "react-icons/gr";
import { FaSignOutAlt, FaBars, FaUserAlt,FaRegChartBar,FaCommentAlt } from "react-icons/fa";

function Main3() {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/login'); 
  };

  const navigateTo = (route) => {
    history.push(route);
  };

  const menuItem = [
    {
        path:"/PageEnseignat/EleveEnseignat",
        name:"EleveEnseignat",
        icon:<FaTh/>
    },
    {
        path:"/PageEnseignat/MonProfil",
        name:"MonProfil",
        icon:<FaUserAlt/>
    },
    {
        path:"/PageEnseignat/EmailParent",
        name:"EmailParent",
        icon:<MdOutlineAlternateEmail/>
    },
    {
        path:"/PageEnseignat/GestionAnnonces1",
        name:"GestionAnnonces1",
        icon:<GrAnnounce/>
    },
    {
        path:"/PageEnseignat/PointEleves",
        name:"PointEleves",
        icon:<FaRegChartBar/>
    },
    {
        path:"PageEnseignat/Messenger",
        name:"Messenger",
        icon:<FaCommentAlt/>
    }
 
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

export default Main3;
