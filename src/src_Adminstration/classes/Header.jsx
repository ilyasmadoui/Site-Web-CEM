import React from 'react';
import logoImage from '../pic/education.png';
import administration from '../pic/director.png';
import notification from '../pic/bell.png';

const Header = () => {
  return (
    <div className="navbar">
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
      </div>
  );
};

export default Header;
