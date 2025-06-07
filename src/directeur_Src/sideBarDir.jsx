import React, { useState } from 'react';
import '../src_Adminstration/Design.css';

import parentImage from '../pic/directeur.png';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";

import {
  FaTh,
  FaSignOutAlt,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
} from "react-icons/fa";
import { NavLink, useHistory } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/demandes",
      name: "ListeDemandes",
      icon: <FaRegChartBar />
    },
    {
      path: "/comptes",
      name: "ListeComptes",
      icon: <IoMdNotifications />
    },
    {
      path: "/eleves",
      name: "Eleves",
      icon: <BiTransfer />
    },
    {
      path: "/addEleve",
      name: "Eleve",
      icon: <FaCommentAlt />
    },
    
    {
      path: "/stat",
      name: "Statistique",
      icon: <FaSignOutAlt />
    },
    {
      path: "/login",
      name: "Login",
      icon: <FaSignOutAlt />
    }

  ];

  const history = useHistory();

  const logout = () => {
    history.push('/Login');
  };

  return (
    <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
      <div className="top_section">
        <img style={{ display: isOpen ? "block" : "none" }} className="accountIconParent" src={parentImage} alt="" />
        <div style={{ marginLeft: isOpen ? "120px" : "0px" }} className="bars">
          {isOpen ? (
            <HiBars3BottomRight onClick={toggle} />
          ) : (
            <FaBars onClick={toggle} />
          )}
        </div>
      </div>
      {menuItem.map((item, index) => (
        <NavLink to={item.path} key={index} className="link" activeClassName="active">
          <div className="icon">{item.icon}</div>
          <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
        </NavLink> 
      ))}
    </div>
  );
};

export default Header;
