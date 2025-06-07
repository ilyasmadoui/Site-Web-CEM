import React, { useState ,useEffect} from 'react';
import '../src_Adminstration/classes/PageAdministration.css';
import parentImage from '../src_Adminstration/pic/director.png';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GiConfirmed } from "react-icons/gi";
import { GrSchedules } from "react-icons/gr";
import { FaBullhorn } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaPeopleLine } from "react-icons/fa6";
import axios from 'axios';
import { BiTransfer } from "react-icons/bi";
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


const PageDirecteur = ({children,email}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const [dataProfil, setDataProfil] = useState({});
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

        }
    ]

    const history = useHistory();
    const [loggedInEmail, setLoggedInEmail] = useState(email);

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
    
export default PageDirecteur;