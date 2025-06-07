import React, { useState } from 'react';
import './directeur.css';
import image_director from './pic/dir4.png';
import { Link } from "react-router-dom";
import axios from 'axios';

function Eleve() {
  const [formData, setFormData] = useState({
    nomFr: '',
    nomAr: '',
    prenomFr: '',
    prenomAr: '',
    sexe: 'Masculin',
    dateNaissance: '',
    niveau: '',
    classe: ''
  });
  const [errors, setErrors] = useState({});
  const [menuActive, setMenuActive] = useState(true);
  const [subMenuActive, setSubMenuActive] = useState(false);
  const [Eleves, setEleve] = useState(null);

  const toggleSubMenu = () => {
    setSubMenuActive(prevSubMenuActive => !prevSubMenuActive);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.nomFr) {
      errors.nomFr = "*Le champ Nom en français est requis.";
    }
    if (!formData.nomAr) {
      errors.nomAr = "*Le champ Nom en arabe est requis.";
    }
    if (!formData.prenomFr) {
      errors.prenomFr = "*Le champ Prénom en français est requis.";
    }
    if (!formData.prenomAr) {
      errors.prenomAr = "*Le champ Prénom en arabe est requis.";
    }
    if (!formData.sexe) {
      errors.sexe = "*Le champ Sexe est requis.";
    }
    if (!formData.dateNaissance) {
      errors.dateNaissance = "*Le champ Date de naissance est requis.";
    }
    if (!formData.niveau) {
      errors.niveau = "*Le champ Niveau est requis.";
    }
    if (!formData.classe) {
      errors.classe = "*Le champ Classe est requis.";
    }
    if (!formData.wilaya) {
      errors.classe = "*Le champ Wilaya est requis.";
    }
    if (formData.nomFr && formData.nomFr !== formData.nomFr.toUpperCase()) {
      errors.nomFr = "*Le nom en français doit être en majuscules.";
    }

    if (formData.prenomFr && (
      formData.prenomFr.charAt(0) !== formData.prenomFr.charAt(0).toUpperCase() ||
      formData.prenomFr.slice(1).toLowerCase() !== formData.prenomFr.slice(1)
    )) {
      errors.prenomFr = "*Le prénom doit commencer par une majuscule et être suivi de minuscules.";
    }

    if (Object.keys(errors).length === 0) {
      
      try {
        const response = await axios.post('http://localhost:5000/addEleve', formData);
        console.log(response.data);
        setFormData({
          nomFr: '',
          nomAr: '',
          prenomFr: '',
          prenomAr: '',
          sexe: '',
          dateNaissance: '',
          niveau: '',
          classe: ''
        });
        alert("L'élève a été ajouté avec succès.");
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);
        alert('Erreur lors de la soumission du formulaire.');
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div >

    <div className='divAdd'>
          <div id="content" className={menuActive ? 'menu-active' : ''}>
            <form className="form-container" onSubmit={handleSubmit}>
              <h2 className='h2'>Ajouter un éléve</h2>
              <div className="input-group">
                <label htmlFor="nomFr">Nom en français:</label>
                <input type="text" id="nomFr" name="nomFr" placeholder='Ecrire..' value={formData.nomFr} onChange={handleChange} />
                {errors.nomFr && <p className="error">{errors.nomFr}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="nomAr">Nom en arabe:</label>
                <input type="text" id="nomAr" name="nomAr" placeholder='Ecrire..' value={formData.nomAr} onChange={handleChange} />
                {errors.nomAr && <p className="error">{errors.nomAr}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="prenomFr">Prénom en français:</label>
                <input type="text" id="prenomFr" name="prenomFr" placeholder='Ecrire..' value={formData.prenomFr} onChange={handleChange} />
                {errors.prenomFr && <p className="error">{errors.prenomFr}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="prenomAr">Prénom en arabe:</label>
                <input type="text" id="prenomAr" name="prenomAr" placeholder='Ecrire..' value={formData.prenomAr} onChange={handleChange} />
                {errors.prenomAr && <p className="error">{errors.prenomAr}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="sexe">Sexe:</label>
                <select id="sexe" name="sexe" value={formData.sexe} onChange={handleChange}>   
                  <option value="male">Masculin</option>
                  <option value="femele">Féminin</option>
                </select>
                {errors.sexe && <p className="error">{errors.sexe}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="dateNaissance">Date de naissance:</label>
                <input type="date" id="dateNaissance" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} />
                {errors.dateNaissance && <p className="error">{errors.dateNaissance}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="classe">Wilaya:</label>
                <input type="text" id="wilaya" name="wilaya" placeholder='Ecrire..' value={formData.wilaya} onChange={handleChange} />
                {errors.wilaya && <p className="error">{errors.wilaya}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="niveau">Niveau:</label>
                <select id="niveau" name="niveau" value={formData.niveau} onChange={handleChange}>
                <option value="1AM">1AM</option>
                <option value="1AM">1AM</option>
              <option value="2AM">2AM</option>
              <option value="3AM">3AM</option>
              <option value="4AM">4AM</option>
            </select>
                
                {errors.niveau && <p className="error">{errors.niveau}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="classe">Classe:</label>
                <input type="text" id="classe" name="classe" placeholder='Ecrire..' value={formData.classe} onChange={handleChange} />
                {errors.classe && <p className="error">{errors.classe}</p>}
              </div>
              <button className='ajouter' type="submit">Ajouter</button>
            </form>
          </div>
        </div>
        </div>

    );
}

export default Eleve;
