import React, { useState, useEffect,useRef } from 'react';
import profImage from '../pic/teatcherLogin.jpg';
import directeurImage from '../pic/admin2.jpg';
import parentImage from '../pic/parentLog2.jpg';
import logoImage from '../pic/file.png';
import './styleSign.css';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import { useHistory } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom/cjs/react-router-dom';

function SignInAd() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword:'',
    phoneNumber: '',
    nomAr: '',
    nomFr: '',
    prenomFr: '',
    prenomAr: '',
    dateN: '',
    sexe:'Male',
    role:1,
    idProfessionnelle: '',
    Wilaya: '',
    school: '', 
    poste: '',
    adresse:''
  });
  const [isVisible, setIsVisible] = useState(1);

  const toggleVisibility = () => {
    setIsVisible((prevVisibility) => prevVisibility+1);
  };

  const [displayedPhrase, setDisplayedPhrase] = useState('');  
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

  const history = useHistory();
  const handleButtonClick = () => {
    history.push('/Login');
  };
  const openParent = () => {
    history.push('/Parent');
  };
  const openEnseignant = () => {
    history.push('/Enseignant');
  };
  
  return (
    <div className="page">
      <div className="navbar">
        <img className="logobar" src={logoImage} alt="" />
        <h1 className="h1bar">Madrassaty</h1>
        <div className="navElement">
          <ul>
            <li className='selectionner'> <Link to="/AllForms">S'inscrire</Link> </li>
            <li> <Link to="/login">Se connecter</Link></li>
          </ul>
        </div>
      </div>
      <div className="allContent">
        <div className="left">
          <div className="signup">

          { /* <img className="accountIcon" src={directeurImage} alt="" />*/}
            <h1 className="signH">          <FaUserCircle className='iconUSer'/>

S'inscrire(administratif)</h1>
            {isVisible === 1 ? (
        <Form1 formData={formData} setFormData={setFormData} toggleVisibility={toggleVisibility} />
        ) : (
         isVisible === 2 ? (
          <Form2 formData={formData} setFormData={setFormData} toggleVisibility={toggleVisibility} />
       ) : (
        <Form3 formData={formData} setFormData={setFormData} />
       )
     )}  
          </div>
        </div>
        <div className="right">
            <div className="contentRight">
                <h1 className="welcome">{displayedPhrase}</h1>
                <p className="rightParg">Vous pouvez également vous inscrire en tant qu'<b>enseignant </b> ou <b>parent</b>.</p>
             <div className="iconInscrire">
              
                <div className="account">
                <button className="iconBtn" onClick={openEnseignant} >
                    <img className="iconBtnimg" src={profImage} alt="" /><br/><br/>
                    <h4>Enseignant</h4>
                </button>
                </div>
                <div className="account">
                <button className="iconBtn" onClick={openParent}>
                    <img className="iconBtnimg" src={parentImage} alt="" /><br/><br/>
                    <h4>Parent</h4>
                </button>
                </div>
             </div>
             
             <br />
             <button className="leftBtn" onClick={handleButtonClick}>Se connecter</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SignInAd;
