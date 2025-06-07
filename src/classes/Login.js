import React, { useState, useEffect, useRef } from 'react';
import '../newTp/styleSign.css';
import logoImage from '../pic/file.png';
import FormLogin from '../newTp/FormLogin'
import Logo from '../pic/file.png'
import profImage from '../pic/teatcherLogin.jpg';
import directeurImage from '../pic/admin2.jpg';
import parentImage from '../pic/parentLog2.jpg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [setIsVisible] = useState(1);
  const [displayedPhrase, setDisplayedPhrase] = useState('');   
  const [role, setRole] = useState(0); 
  const phrase = "Vous êtes le bienvenu !";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < phrase.length-1) {
        setDisplayedPhrase(prevPhrase => prevPhrase + phrase[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prevVisibility) => prevVisibility+1);
  };

  const history = useHistory();
  const openParent = () => {
    history.push('/Parent');
  };
  const openEnseignant = () => {
    history.push('/Enseignant');
  };
  const openAdmin = () => {
    history.push('/AllForms');
  };


  return (
    <div className="page">
      <div className="navbar">
        <img className="logobar" src={logoImage} alt="" />
        <h1 className="h1bar">Madrassaty</h1>
        <div className="navElement">
          <ul>
          <li > <Link to="/AllForms">S'inscrire</Link> </li>
            <li className='selectionner'> <Link to="/login">Se connecter</Link></li>
          </ul>
        </div>
      </div>

      <div className="allContent">
        <div className="left">
          <div className="signup">
          <div className='infoAcountIcon'><img className="accountIconLogin" src={Logo} alt="" />
          <h1 className="signH1">Se connecter <samp className='type'></samp></h1></div>
             <br/><br/>
              <FormLogin formData={formData} setFormData={setFormData} toggleVisibility={toggleVisibility} />
          </div>
        </div> 
         
        <div className="right">
          <div className="contentRight">
            <h1 className="welcome">{displayedPhrase}</h1>
            <p className="rightParg">Vous pouvez également vous connecter en tant qu'<b>Adminisration </b> ou <b>Parent</b> ou <b>Enseignant</b>.</p>
            <br/><p>Vous n'avez pas de compte ? <b>Connectez-vous</b></p>
            <div className="iconInscrire">
              <div className="account">
                <button className="iconBtn" onClick={openAdmin}>
                  <img className="iconBtnimg" src={directeurImage} alt="" /><br/><br/>
                  <h4>Administratif</h4>
                </button>
              </div>
              <div className="account">
                <button className="iconBtn" onClick={openParent}>
                  <img className="iconBtnimg" src={parentImage} alt="" /><br/><br/>
                  <h4>Parent</h4>
                </button>
              </div>
              <div className="account">
                <button className="iconBtn" onClick={openEnseignant}>
                  <img  className="iconBtnimg" src={profImage} alt="" /><br/><br/>
                  <h4>Enseignant</h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
