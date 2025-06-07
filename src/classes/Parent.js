import profImage from '../pic/teatcherLogin2.jpg';
import directeurImage from '../pic/admin2.jpg';
import parentImage from '../pic/parents.png';
import logoImage from '../pic/file.png';
import React, { useState, useEffect,useRef } from 'react';
import { useHistory  } from 'react-router-dom';
import '../newTp/styleSign.css';
import Form1 from '../newTp/Form1';
import Form2 from '../newTp/Form2';
import axios from 'axios'
import Form3_parent from '../newTp/Form3_parent';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Parent() {
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
    role:3,
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
          <li className='selectionner'> <Link to="/AllForms">S'inscrire</Link> </li>
            <li> <Link to="/login">Se connecter</Link></li>
          </ul>
        </div>
      </div>
      <div className="allContent">
        <div className="left">
          <div className="signup">
          <h1 className="signH">          <FaUserCircle className='iconUSer'/>

S'inscrire(parent)</h1>       
            {isVisible === 1 ? (
        <Form1 formData={formData} setFormData={setFormData} toggleVisibility={toggleVisibility} />
        ) : (
         isVisible === 2 ? (
       <Form2 formData={formData} setFormData={setFormData} toggleVisibility={toggleVisibility} />
       ) : (
        <Form3_parent formData={formData} setFormData={setFormData} />
       )
     )}  
          </div>
        </div>
        <div className="right">
            <div className="contentRight">
            <h1 className="welcome">{displayedPhrase}</h1>
                <p className="rightParg">Vous pouvez également vous inscrire en tant qu'<b>enseignant </b> ou <b>Administration</b>.</p>
             <div className="iconInscrire">
              
                <div className="account">
                <button className="iconBtn">
                    <img src={profImage} className="iconBtnimg" alt="" onClick={openEnseignant}/>
                <h4>Enseignant</h4></button>
                

                </div>
                <div className="account">
                <button className="iconBtn">
                    <img src={directeurImage} className="iconBtnimg" alt="" onClick={openAdmin} />
                <h4>Adminisration</h4> </button>
               

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
export default Parent;