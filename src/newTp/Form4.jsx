import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styleSign.css';
import Poste from '../pic/poste.png'; 
import School from '../pic/school.png'; 
import Id from '../pic/nombre.png'; 
import Place from '../pic/place.png'; 
import axios from 'axios';

function Form4({formData, setFormData }) {
  const optionsWilaya = ['Adrar', 'Biskra', 'Alger', 'Oran', 'Batna'];
  const educationalStages = ['CEM1', 'CEM2', 'CEM3'];
  const positions = ['Éducation civique', 'Sport ', 'Histoire-Géographie','Physiques','Sciences','Langue arabe','Langue francais','Langue englais','Mathématiques'];

  const [values, setValues] = useState({
    idProfessionnelle: '',
    Wilaya: '',
    school: '',
    poste: '',
  });
const history=useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up form submitted:', formData);
    axios.post('http://localhost:5000/signup',formData)
    .then(res=>
   alert("success"), history.push('/')
  )
    .catch(err =>console.log(err))
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  return (
    <div className="thirdForm">
      <p className="parg"><samp className="numbre">3</samp> Les informations professionnelles :</p>
      <form onSubmit={handleSubmit} className='form1'>
        <label htmlFor="idProfessionnelle" className="labelForm">
          <img src={Id} alt="" className="iconInput" /> Numéro d'identification professionnel
        </label>
        <input type="text" className='inputForm' id='idProfessionnelle' name='idProfessionnelle' required placeholder="Ecrire..." value={values.idProfessionnelle} onChange={handleChange} />

        <label htmlFor="Wilaya" className="labelForm">
          <img src={Place} alt="" className="iconInput" /> Wilaya
        </label>
        <select className='selectForm' id='Wilaya' name='Wilaya' required value={values.Wilaya} onChange={handleChange}>
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
        <select className='selectForm' id='school' name='school' required value={values.school} onChange={handleChange}>
          <option value="" disabled hidden>Choisir...</option>
          {educationalStages.map((stage, index) => (
            <option key={index} value={stage}>
              {stage}
            </option>
          ))}
        </select>

        <label htmlFor="poste" className="labelForm">
          <img src={Poste} alt="" className="iconInput" /> Matière
        </label>
        <select className='selectForm' id='poste' name='poste' required value={values.poste} onChange={handleChange}>
          <option value="" disabled hidden>Choisir...</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>
              {position}
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

export default Form4;
