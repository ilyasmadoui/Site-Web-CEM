import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import EmailImg from '../pic/at1.png';
import PasswordImg from '../pic/padlock1.png';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Email from '../smtp';
import axios from 'axios';
import "../newTp/styleSign.css"

export const Navbar_inscrire = ({ formDataProp, setFormDataProp, toggleVisibility }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const history = useHistory();
    const [code, setCode] = useState('');
    const [stage, setStage] = useState(1); // 1: Enter email, 2: Enter code, 3: Reset password

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!testValidation()) {
            toggleVisibility();
        }
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

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    const testValidation = () => {
        validateEmail();
        validatePassword();
        validateConfirmationPassword();
        return !(errorEmail || errorPassword || errorConfirmPassword);
    };

    const [motDePasseOublieModalIsOpen, setMotDePasseOublieModalIsOpen] = useState(false);
    const ouvrirMotDePasseOublieModal = () => {
        setMotDePasseOublieModalIsOpen(true);
    };


    const sendemail = () => {
        validateEmail();
        if (formData.email && !errorEmail) {
            const email = formData.email;
            axios.post('http://localhost:5000/sendVerificationCode', { email })
                .then(res => {
                    console.log(res.data.result);
                    alert('Le code de vérification a été envoyé à votre adresse e-mail. Veuillez vérifier.');
                    setCode(res.data.result);
                    setStage(2);
                })
                .catch(err => console.error('Erreur lors de l\'envoi du code de vérification:', err));
        }else{
            alert("Enter un valid entree !")
        }
    };


    function validate_code() {
        const code_entre = formData.code.trim();
        if (code === code_entre) {
            alert("Le code saisi est correct ");
            setStage(3); // Move to the next stage to reset the password
        } else {
            alert("Le code saisi est incorrect. Veuillez réessayer.");
        }
    }

    async function resetPassword() {
            try {
                const response = await axios.post('http://localhost:5000/restPassword', formData);
             alert('Les données ont été mises à jour avec succès!');
                    window.location.reload(); 
            } catch (err) {
                console.error('Erreur lors de la mise à jour des données:', err);
                alert('Erreur lors de la mise à jour des données.');
            }
       
    }
    const handletestPassword = (e) => {
        e.preventDefault();
        if (formData.newPassword === formData.confirmNewPassword && formData.newPassword.length >= 8) {

        // Add your login logic here using the email state
        axios.post('http://localhost:5000/testPassword', formData)
          .then(res => {
            if (res.data.status === "success") {
                          alert("Entre un mots de passe differnt");

            } else { resetPassword(); 
            }
          })
          .catch(err => console.log(err));
        } else {
            alert("Les mots de passe ne correspondent pas ou sont trop courts");
        }
      }
      
    
    const handletestEmail = (e) => {
        e.preventDefault();
        // Add your login logic here using the email state
        axios.post('http://localhost:5000/testEmail', formData)
          .then(res => {
            if (res.data.status === "success") {
              sendemail();
            } else {
              alert("Entre valid email");
            }
          })
          .catch(err => console.log(err));
      }
      

    return (
        <nav>
            <p>mot de passe oublié ! <a href="#" className='req' onClick={ouvrirMotDePasseOublieModal}>recuperer</a></p>

            <Modal
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        color: '#2a4356',
                        backgroundColor: 'rgb(240, 248, 255)',
                        borderRadius: '8px',
                        width: '300px',
                        height: '250px',
                        margin: 'auto',
                        marginLeft: '30%'
                    }
                }}
                isOpen={motDePasseOublieModalIsOpen}
                onRequestClose={() => setMotDePasseOublieModalIsOpen(false)}
            >
                <button className='fermer' onClick={() => setMotDePasseOublieModalIsOpen(false)}>X</button>
                <br />
                <h3 className='h3-navbar-inscrire'>Recuperer mot de passe !</h3>
                <div>
                    {stage === 1 ? (
                        <form >
                            <label htmlFor="email" className="labelForm">
                                <img src={EmailImg} alt="" className="iconInput" /> Email* {errorEmail && <samp className="error-message">({errorEmail})</samp>}
                            </label>
                            <input type="email" className='inputForm' id='email' name='email' placeholder="Ecrire..."
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={validateEmail}
                            />
                            <div className='sendCodeReq'>
                            <label className="labelForm">Envoyer un code a mon e_mail : </label>
                            <button className="btn_Nav_Inscrire" onClick={handletestEmail} type='submit'>Envoyer</button>
                       </div> 
                       </form>
                    ) : stage === 2 ? (
                        <form >
                            <label className="labelForm">Saisir le code envoyé :</label>
                          
                            <input type="text" className='code' id='code' name='code' onChange={handleChange} value={formData.code} placeholder="######" />
                          <div className='sendCodeReq'>

                            <button className="btn_Nav_Inscrire" onClick={validate_code}>Confirmer</button>
                            <button className="btn_Nav_Inscrire" onClick={handletestEmail} type='submit'>Renvoyer autre code</button>

                            </div> 

                        </form>
                    ) : (
                        <form >
                            <label htmlFor="newPassword" className="labelForm">
                                <img src={PasswordImg} alt="" className="iconInput" /> Nouveau mot de passe* {errorPassword && <samp className="error-message">({errorPassword})</samp>}
                            </label>
                            <input type="password" className='inputForm' id='newPassword' name='newPassword' placeholder="Nouveau mot de passe..."
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <br />
                            <label htmlFor="confirmNewPassword" className="labelForm">
                                <img src={PasswordImg} alt="" className="iconInput" /> Confirmer nouveau mot de passe* {errorConfirmPassword && <samp className="error-message">({errorConfirmPassword})</samp>}
                            </label>
                            <input type="password" className='inputForm' id='confirmNewPassword' name='confirmNewPassword' placeholder="Confirmer nouveau mot de passe..."
                                value={formData.confirmNewPassword}
                                onChange={handleChange}
                            />
                             <div className='sendCodeReq'>
                               <button className="btn_Nav_Inscrire" onClick={handletestPassword}>Confermer</button>
                            </div> 
                        </form>
                    )}
                </div>
            </Modal>
        </nav>
    );
}
