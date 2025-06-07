import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../Design.css';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";

Modal.setAppElement('#root');

const MonProfil = () => {
    const [dataProfil, setDataProfil] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [emailVerifiedCode, setEmailVerifiedCode] = useState(false);
    const [verificationCodeserver, setVerificationCodeserver] = useState('');
    const [inputValid, setInputValid] = useState(false);

    let savedEmail = localStorage.getItem('email');

    useEffect(() => {
        if (savedEmail) {
            fetchProfileData(savedEmail);
        }
    }, [savedEmail]);

    const personalInfo = [
        { label: 'Identification', value: dataProfil.id },
        { label: 'Nom (Arabe)', value: dataProfil.nomAr },
        { label: 'Prénom (Arabe)', value: dataProfil.prenomAr },
        { label: 'Nom (Français)', value: dataProfil.nomFr },
        { label: 'Prénom (Français)', value: dataProfil.prenomFr },
        { label: 'Wilaya', value: dataProfil.Wilaya },
        { label: 'Date de Naissance', value: dataProfil.dateN },
        { label: 'Sexe', value: dataProfil.sex }
    ];

    const editableInfo = [
        { label: 'Email', value: dataProfil.email, editable: true, nameInBd: 'email' },
        { label: 'Téléphone', value: dataProfil.telph, editable: true, nameInBd: 'telph' },
        { label: 'Mot de Passe', value: '', editable: true, nameInBd: 'password' }
    ];

    const fetchProfileData = async (email) => {
        try {
            const response = await axios.get('http://localhost:5000/compteInfo', {
                params: { email }
            });
            setDataProfil(response.data.result);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    const handleEditClick = (field, value) => {
        setCurrentField(field);
        setCurrentValue(value);
        setModalIsOpen(true);
    };

    const handleCancel = () => {
        setModalIsOpen(false);
        setEmailVerifiedCode(false);
    };

    const validInput = (value) => {
        let isValid = false;
        if (currentField === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (currentField === 'password') {
            isValid = value.length >= 8;
        } else if (currentField === 'telephone') {
            isValid = /^[0-9]{10}$/.test(value) && (value.startsWith('06') || value.startsWith('07') || value.startsWith('05'));
        }
        setInputValid(isValid);
        return isValid;
    };

    const handleVerifyEmail = () => {
        if (currentValue && validInput(currentValue)) {
            const email = currentField === 'email' ? currentValue : savedEmail;
            axios.post('http://localhost:5000/sendVerificationCode', { email })
                .then(res => {
                    console.log(res.data.result);
                    alert('Le code de vérification a été envoyé à votre adresse e-mail. Veuillez vérifier.');
                    setVerificationCodeserver(res.data.result);
                    setEmailVerifiedCode(true);
                })
                .catch(err => console.error('Erreur lors de l\'envoi du code de vérification:', err));
        }else{
            alert("Enter un valid entree !")
        }
    };

    const renderInputField = () => {
        if (currentField === 'email') {
            return (
                <input
                    type="email"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                />
            );
        } else if (currentField === 'password') {
            return (
                <input
                    type="password"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                />
            );
        } else if (currentField === 'telephone') {
            return (
                <input
    type="tel"
    pattern="[0-9]*"
    value={currentValue}
    onChange={(e) => setCurrentValue(e.target.value)}
    
/>

            );
        } else {
            return (
                <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                />
            );
        }
    };
  
    

    const sendDataToServer = () => {
        if (currentValue && validInput(currentValue)){
            if(verificationCode === verificationCodeserver) {
            const updatedData = {
                field: currentField,
                value: currentValue,
                id: dataProfil.id
            };
            axios.post('http://localhost:5000/updateProfile', updatedData)
                .then(res => {
                    alert('Les données ont été mises à jour avec succès!');
                    if (currentField === 'email') {
                        localStorage.setItem('email', currentValue);
                    }
                    setModalIsOpen(false);
                    setEmailVerifiedCode(false);
                })
                .catch(err => console.error('Erreur lors de la mise à jour des données:', err));
            }
            }else{
                alert("Enter un valid entree !")
            }
        };
    
        const handleFileChange = (event) => {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                uploadProfilePic(selectedFile);
            }
        };
    
        const uploadProfilePic = async (file) => {
            const formData = new FormData();
            formData.append('profilePic', file);
            formData.append('id', dataProfil.id);
    
            try {
                const response = await axios.post('http://localhost:5000/uploadProfilePic', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert('L\'image a été téléchargée avec succès!');
                fetchProfileData(savedEmail);
            } catch (error) {
                console.error('Erreur lors du téléchargement du fichier:', error);
            }
        };
    
        return (
            <div className="container-profile">
                <div className="profile-card">
                    <div className="profile-header">
                        <img
                            src={`http://localhost:5000/images/${dataProfil.photoProfil?.replace('public\\images\\', '')}`}
                            alt="Profile"
                            className="profile-pic"
                        />
                        <div className="PicInput">
                            <label className='profile-pic-label' htmlFor='profilePicInput'><h4>Changer la photo</h4></label>
                            <input
                                id="profilePicInput"
                                type="file"
                                className="file-input"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="profile-info">
                        <div className="info-section">
                            <h3>Informations Personnelles</h3>
                            <ul className="profile-details">
                                {personalInfo.map(option => (
                                    <li key={option.label} className="profile-item">
                                        <strong>{option.label}: </strong>
                                        {option.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="info-section">
                            <h3>Informations Modifiables</h3>
                            <ul className="profile-details">
                                {editableInfo.map(option => (
                                    <li key={option.label} className="profile-item">
                                        <strong>{option.label}: </strong>
                                        {option.value}
                                        {option.editable && (
                                            <button className="edit-button" onClick={() => handleEditClick(option.nameInBd.toLowerCase(), option.value)}>
                                                <MdModeEdit />
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCancel}
                    contentLabel="Modifier les informations"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <div className="inputModifie">
                        <h2>Confirmer {currentField}</h2>
                        {renderInputField()}
    
                        {emailVerifiedCode && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Entrez le code de vérification ici"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                            </div>
                        )}
    
                        {!emailVerifiedCode ? (
                            <button className='btnSendCode' onClick={handleVerifyEmail}>Envoyer le code de vérification</button>
                        ) : (
                            <button className='btnSendCode' onClick={handleVerifyEmail}>Renvoyer le code de vérification</button>
                        )}
                    </div>
                    <div className="modal-buttons">
                        <button disabled={!inputValid} onClick={sendDataToServer}>Enregistrer</button>
                        <button onClick={handleCancel}>Annuler</button>
                    </div>
                </Modal>
            </div>
        );
    };
    
    export default MonProfil;
    
