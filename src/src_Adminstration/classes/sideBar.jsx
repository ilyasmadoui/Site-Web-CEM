import React, { useState } from 'react';
import '../Design.css';
import parentImage from '../pic/directeur.png';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
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

const Header = () => {
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const menuItem=[
      {
          path:"/Eleves",
          name:"Eleves",
          icon:<FaTh/>
      },
      {
          path:"/MonProfil",
          name:"MonProfil",
          icon:<FaUserAlt/>
      },
      {
          path:"/FeuillesDePoints",
          name:"FeuillesDePoints",
          icon:<FaRegChartBar/>
      },
      {
          path:"/AbsencesDesEnfants",
          name:"AbsencesDesEnfants",
          icon:<IoMdNotifications/>
      },
      {
          path:"/DemandesDeTransfert",
          name:"DemandesDeTransfert",
          icon:<BiTransfer/>
      },
      {
          path:"/Messenger",
          name:"Messenger",
          icon:<FaCommentAlt/>
      },
      {
          path:"/Login",
          name:"Login",
          icon: <FaSignOutAlt/>

      }
  ]

  const history = useHistory(); 

  const logout = () => {
      history.push('/Login');
  };
  return (
    <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <img style={{display: isOpen ? "block" : "none"}} className="accountIconParent" src={parentImage} alt="" />
                   <div style={{marginLeft: isOpen ? "120px" : "0px"}} className="bars">
                   {isOpen ? (
                        <HiBars3BottomRight onClick={toggle} /> 
                     ) : (
                        <FaBars onClick={toggle} /> 
                    )}                  
                    </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
    /*<div className="navbar">
        <div className="logoo">
        <img className="logobar" src={logoImage} alt="" />
        <h1 className="h1bar">Madrassaty</h1>
       </div>
        <div className="navElement">
           <ul >
            <li className='listNoti'><img  className='notification' srcset={notification} alt="" /></li>
            <li>Houas Khedidjas <img className='picOfaccount' srcset={administration} alt="" /></li>
           </ul>
        </div>
      </div>*/
  );
};

export default Header;
