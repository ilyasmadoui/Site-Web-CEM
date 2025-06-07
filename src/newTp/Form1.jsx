import React, { useState } from 'react';
import './styleSign.css';
import EmailImg from '../pic/at1.png';
import PasswordImg from '../pic/padlock1.png';
import PhoneImg from '../pic/telephone1.png';
import {VscEye, VscEyeClosed } from "react-icons/vsc"; 

function Form1({ formData, setFormData, toggleVisibility }) {
  const [showPassword, setShowPassword] = useState(false); 
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    let hasError = false;
  
    if (formData.email === '') {
      formErrors.email = 'Veuillez renseigner ce champ';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Adresse e-mail invalide";
      hasError = true;
    }
  
    if (formData.password === '') {
      formErrors.password = 'Veuillez renseigner ce champ';
      hasError = true;
    } else if (formData.password.length < 8) {
      formErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
      hasError = true;
    }
  
    if (formData.confirmPassword === '') {
      formErrors.confirmPassword = 'Veuillez renseigner ce champ';
      hasError = true;
    } else if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      hasError = true;
    }

    if (formData.phoneNumber === '') {
      formErrors.phoneNumber = 'Veuillez renseigner ce champ';
      hasError = true;
    } else if (!/^(0)([567])(\d{8})$/.test(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Veuillez saisir un numéro de téléphone valide en Algérie';
      hasError = true;
    }
  
    if (hasError) {
      setErrors(formErrors);
      return;
    }
  
    toggleVisibility();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim()
    }));

    // Clear error message when user types in the fields
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  

  return (
    <div className="FirstForm">
      <p className="parg"><samp className="numbre">1</samp>Les informations de compte :</p>
      <form action="" className='form1' onSubmit={handleSubmit}>
        <label htmlFor="email" className="labelForm">
          <img src={EmailImg} alt="" className="iconInput" /> Email* 
        </label>
        <input type="email" className='inputForm' id='email' name='email'  placeholder="Ecrire..."
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}

        <div className="password-input"> 
        <label htmlFor="password" className="labelForm">
          <img src={PasswordImg} alt="" className="iconInput" /> Mot de passe*
        </label>
        <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className='inputForm' id='password' name='password'  placeholder="Ecrire..."
          />
          {/* masquer/  afficher le mot de passe */}
          <span className='password-icon'>
                  {showPassword ? (
                     <VscEye className="password-icon" onClick={() => setShowPassword(false)} />
                        ) : (
                     <VscEyeClosed className="password-icon" onClick={() => setShowPassword(true)} />
           )}</span>
        </div>
        {errors.password && <div className="error-message">{errors.password}</div>}

        <div className="password-input"> 
        <label htmlFor="confirmPassword" className="labelForm">
          <img src={PasswordImg} alt="" className="iconInput" /> Confirmation mot de passe* 
        </label>
        <input type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className='inputForm' id='confirmPassword' name='confirmPassword'  placeholder="Ecrire..."
          />
           {/* masquer/  afficher le mot de passe */}
           <span className='password-icon'>
                  {showPassword ? (
                     <VscEye className="password-icon" onClick={() => setShowPassword(false)} />
                        ) : (
                     <VscEyeClosed className="password-icon" onClick={() => setShowPassword(true)} />
            )}</span>
        </div>
        {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

        <label htmlFor="phoneNumber" className="labelForm">
          <img src={PhoneImg} alt="" className="iconInput" /> Téléphone* 
        </label>
        <input type="tel" onKeyDown={(e) => {
          const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
          if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
          }
        }} className='inputForm' id='phoneNumber' onChange={handleChange} value={formData.phoneNumber}  name='phoneNumber'  placeholder="Ecrire..." />
        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}

        <div className="divBtnSub">    
                            <button className="btnForm" type='submit' >Suivant</button>
               </div>
      </form>
    </div>
  );
}

export default Form1;
