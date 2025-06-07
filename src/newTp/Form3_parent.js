import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../newTp/styleSign.css';
import { TiLocationOutline as TbMapPinDown } from 'react-icons/ti'; // Importing the icon
import School from '../pic/school.png';
import Id from '../pic/nombre.png';
import Place from '../pic/place.png';
import axios from 'axios'

function Form3({ formData,setFormData }) {
  const optionsSchool = ['CEM1', 'CEM2', 'CEM3'];
  const optionsWilaya = ['Adrar', 'Biskra', 'Alger', 'Oran', 'Batna'];
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

    const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    axios.post('http://localhost:5000/signup',formData)
    .then(res=>
   alert("success"),history.push('/')
  )
    .catch(err =>console.log(err))
};

 
  
  return (
    <div className="thirdForm">
      <p className="parg">
        <samp className="numbre">3</samp> Les informations professionnelles :
      </p>

      <form className="form1" onSubmit={handleSubmit}>
        <label htmlFor="idProfessionnelle" className="labelForm">
          <img src={Id} alt="" className="iconInput" /> Numéro d'identification professionnel
        </label>
        <input
          type="text"
          className="inputForm"
          id="idProfessionnelle"
          name="idProfessionnelle"
          value={formData.idProfessionnelle}
          onChange={handleChange}
          required
          placeholder="Ecrire..."
        />

        <label htmlFor="Wilaya" className="labelForm">
          <img src={Place} alt="" className="iconInput" /> Wilaya
        </label>
        <select
          className="selectForm"
          id="Wilaya"
          name="Wilaya"
          value={formData.Wilaya}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            Choisir...
          </option>
          {optionsWilaya.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="school" className="labelForm">
          <img src={School} alt="" className="iconInput" />School
        </label>
        <select
          className="selectForm"
          id="school"
          name="school"
          value={formData.school}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            Choisir...
          </option>
          {optionsSchool.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="adresse" className="labelForm">
          <TbMapPinDown /> Adresse
        </label>
        <input
          type="text"
          id="adresse"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          className="inputForm"
          required
          placeholder="Entrez votre adresse..."
        />

<div className="divBtnSub">    
                            <button className="btnForm" type='submit' >Suivant</button>
               </div>
      </form>
    </div>
  );
}

export default Form3;
