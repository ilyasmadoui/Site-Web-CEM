import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styleSign.css';
import Poste from '../pic/poste.png'; 
import School from '../pic/school.png'; 
import Id from '../pic/nombre.png'; 
import Place from '../pic/place.png'; 
import axios from 'axios'

function Form3({ formData,setFormData }) {
  const optionsSchool = ['CEM1', 'CEM2', 'CEM3'];
  const optionsPoste = ['Superviseur pédagogique', 'Conseiller d\'orientation', 'Conseiller en éducation'];
  const optionsWilaya = ['Adrar', 'Biskra', 'Alger', 'Oran', 'Batna'];

  const [formErrors,setFormErrors] =useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted: ....', formData);
    axios.post('http://localhost:5000/signup',formData)
    .then(res=>
   alert("success"),history.push('/'))
    .catch(err =>console.log(err))
};
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  /*const handleChange = (e) => {
    const { name, value } = e.target;
    const IdProfessionnelle = /^[A-Za-z0-9]{6}$/;
    
    if (name === 'idProfessionnelle' && !IdProfessionnelle.test(value)) {
      setFormErrors({ ...formErrors, [name]: "L'ID professionnelle doit contenir exactement 6 caractères alphanumériques" });
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
      setFormData({ ...formData, [name]: value });
    }
  };*/


  return (
    <div className="thirdForm">
      <p className="parg"><samp className="numbre">3</samp> Les informations professionnelles :</p>
      <form onSubmit={handleSubmit} className='form1'>
        <label htmlFor="idProfessionnelle" className="labelForm">
          <img src={Id} alt="" className="iconInput" /> Numéro d'identification professionnel
        </label>
        <input type="text" className='inputForm' id='idProfessionnelle' name='idProfessionnelle' required placeholder="Ecrire..." value={formData.idProfessionnelle} onChange={handleChange} />

        <label htmlFor="Wilaya" className="labelForm">
          <img src={Place} alt="" className="iconInput" /> Wilaya
        </label>
        <select className='selectForm' id='Wilaya' name='Wilaya' required value={formData.Wilaya} onChange={handleChange}>
          <option value="" disabled hidden>Choisir...</option>
          {optionsWilaya.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="school" className="labelForm">
          <img src={School} alt="" className="iconInput" /> School
        </label>
        <select className='selectForm' id='school' name='school' required value={formData.school} onChange={handleChange}>
          <option value="" disabled hidden>Choisir...</option>
          {optionsSchool.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="poste" className="labelForm">
          <img src={Poste} alt="" className="iconInput" /> Poste
        </label>
        <select className='selectForm' id='poste' name='poste' required value={formData.poste} onChange={handleChange}>
          <option value="" disabled hidden>Choisir...</option>
          {optionsPoste.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="divBtnSub">    
                            <button className="btnForm" type='submit' >Suivant</button>
               </div>
      </form>
    </div>
  );
}

export default Form3;
