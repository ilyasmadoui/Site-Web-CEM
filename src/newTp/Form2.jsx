import React, { useState, useEffect,useRef, useHis } from 'react';
import './styleSign.css';
import { RiPassExpiredLine } from "react-icons/ri";
import User from '../pic/user.png'; 
import Date from '../pic/date.png'; 
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Form2({ formData, setFormData, toggleVisibility }) {
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();
  function estArabe(texte) {
    var Arabe = /^[\u0600-\u06FF\s]+$/;
    return Arabe.test(texte);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'nomAr' && !estArabe(value)) {
      setFormErrors({ ...formErrors, [name]: 'Veuillez entrer des caractères en arabe uniquement' });
    } else if (name === 'prenomAr' && !estArabe(value)) {
      setFormErrors({ ...formErrors, [name]: 'Veuillez entrer des caractères en arabe uniquement' });
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
      setFormData({ ...formData, [name]: value });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  
    toggleVisibility();
  };


  return (
            <div className="secondForm">
            <p className="parg"><samp className="numbre">2</samp>Les informations personnel :</p>
              
              <form action="" className='form1' onSubmit={handleSubmit}>
                <div className="two">
                  <div className="one" id='one1'>
               <label htmlFor="nomAr" className="labelForm"> 
               <img src={User} alt="" className="iconInput" /> Nom en Arabe</label>
                <input type="text" className='inputForm' id='nomAr' name='nomAr' required placeholder="Ecrire..."
                 value={formData.nomAr}
                 onChange={handleChange} />
                   </div>
                  <div className="one">
                <label htmlFor="nomFr" className="labelForm"> <img src={User} alt="" className="iconInput" /> Nom en Francais</label>
                <input type="text" className='inputForm' id='nomFr' name='nomFr' required placeholder="Ecrire..." 
                 value={formData.nomFr}
                 onChange={handleChange}/>
               </div>
               </div>
               <div className="two">
                  <div className="one" id='one1'>
                  <label htmlFor="prenomAr" className="labelForm">
                  <img src={User} alt="" className="iconInput" /> Prenom en Arabe</label>
                <input type="text" className='inputForm' id='prenomAr' name='prenomAr' required placeholder="Ecrire..." 
                 value={formData.prenomAr}
                 onChange={handleChange}/>
                   </div>
                  <div className="one">
                  <label htmlFor="prenomFr" className="labelForm">
                  <img src={User} alt="" className="iconInput" /> Prenom en Francais</label>
                <input type="text" className='inputForm' id='prenomFr' name='prenomFr' required placeholder="Ecrire..."
                value={formData.prenomFr}
                onChange={handleChange}/>
               </div>
               </div>
               <label htmlFor="sexe" className="labelForm"><RiPassExpiredLine/> Sexe</label>
               <select value={formData.sexe} id="sexe" name="sexe" onChange={handleChange} className='selectForm'
                >
                 <option value="male">Male</option>
                 <option value="female">Female</option>
               </select>
                
               <label htmlFor="dateN" className="labelForm">
               <img src={Date} alt="" className="iconInput" /> Date de naissance</label>
                <input type="date" className='inputForm' id='dateN' name='dateN' required placeholder="Ecrire..."
                 value={formData.dateN}
                 onChange={handleChange} />
                <br /><br />
                <div className="divBtnSub">    
                            <button className="btnForm" type='submit' >Suivant</button>
               </div>

              </form>
            </div>
           
  );
}

export default Form2;
