import React, { useState, useEffect } from 'react';
import './styleSign.css';
import PasswordImg from '../pic/padlock1.png';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import { Navbar_inscrire } from '../Navbars/Mot_de _passe_oublie';
import axios from 'axios';

function FormLogin({toggleVisibility }) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
const history = useHistory();
 /* 
  useEffect(() => {
    if (role !== null) {
      switch (role) {
        case 1:
          history.push("/AdminPage");
          break;
        case 2:
          history.push("/EnsegninetPage");
          break;
        case 3:
          history.push("/ParentPage");
          break;
      }
    }
  }, [role]);*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error message when user types in the fields
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

 
  function validateEmail() {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email) {
      setErrorEmail('Veuillez saisir votre e-mail');
    } else if (!emailRegex.test(formData.email)) {
      setErrorEmail('Entrez une adresse e-mail valide');
    } else {
      setErrorEmail('');
    }
  }

  function validatePassword() {
    if (!formData.password) {
      setErrorPassword('Veuillez saisir votre mot de passe');
    } else if (formData.password.length < 8) {
      setErrorPassword('Écrire au moins 8 caractères');
    } else {
      setErrorPassword('');
    }
  }

  function validateConfirmationPassword() {
    if (!formData.confirmPassword) {
      setErrorConfirmPassword('Veuillez saisir votre mot de passe');
    } else if (formData.password !== formData.confirmPassword) {
      setErrorConfirmPassword('Les mots de passe ne correspondent pas');
    } else {
      setErrorConfirmPassword('');
    }
  }
  function validateConfirmationPassword() {
    if (!formData.confirmPassword) {
      setErrorConfirmPassword('Veuillez saisir votre mot de passe');
    } else if (formData.password !== formData.confirmPassword) {
      setErrorConfirmPassword('Les mots de passe ne correspondent pas');
    } else {
      setErrorConfirmPassword('');
    }
  }


  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [isSubmit, setSubmit] = useState(false);

  const testValidation = () => {
    validateEmail();
    validatePassword();
    validateConfirmationPassword();
    if (errorEmail || errorPassword ) {
      return false; 
    } else {
      return true;
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here using the email state
    console.log('Login form submitted:', formData);
    axios.post('http://localhost:5000/login', formData)
      .then(res => {
        if (res.data.status === "success") {
          console.log("Session data:", res.data.session);
          
          localStorage.setItem('email', formData.email); // Store email in localStorage
          const roleFromResponse = res.data.session.role; // Corrected access to role
          console.log("User role :", roleFromResponse);
          setRole(roleFromResponse);
          console.log("Result:", res.data.result);
          history.push("/Accueil");
         /* if(roleFromResponse===0){
            history.push("/DirecteurProfile");
          }else if(roleFromResponse===1){
            history.push("/Administration");
          }else if(roleFromResponse===3){
            history.push("/PageParent");
          }
          else if(roleFromResponse===2){
            history.push(`/PageEnseignat?email=${formData.email}`);
          }*/
        } else {
          alert("FalseLogin");
        }
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className="FirstForm">
      <form action="" className='form1' onSubmit={handleSubmit}>
        <div className="username-input">
          <label htmlFor="email" className="labelForm"><AiOutlineMail/> Email ou numéro de téléphone* </label>
          <input type="email" className='inputForm' id='email' name='email' value={formData.email} onChange={handleChange} placeholder="Ecrire..." />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <br />
        <div className="password-input">
          <label htmlFor="password" className="labelForm">
            <img src={PasswordImg} alt="" className="iconInput" /> Mot de passe*
          </label>
          <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className='inputForm' id='password' name='password' placeholder="Ecrire..." />
          {/* masquer/afficher le mot de passe */}
          <span className='password-icon'>
            {showPassword ? (
              <VscEye className="password-icon" onClick={() => setShowPassword(false)} />
            ) : (
              <VscEyeClosed className="password-icon" onClick={() => setShowPassword(true)} />
            )}
          </span>
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <Navbar_inscrire formData={formData} setFormData={setFormData} toggleVisibility={toggleVisibility} />
        <div className="divBtnSub">    
                            <button className="btnForm" type='submit' >se connecter</button>
               </div>
      </form>
    </div>
  );
}

export default FormLogin;
