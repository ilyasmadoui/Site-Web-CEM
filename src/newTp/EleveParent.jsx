import React, { useState, useEffect } from 'react';
import { ImPrinter } from "react-icons/im";
import { FaTimes, FaCheck } from 'react-icons/fa';
import { IoPersonAddOutline } from "react-icons/io5";
import axios from 'axios';
import '../newTp/PageParent.css';

const EleveParent = () => {
  const [eleves, setEleves] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nouvelEleve, setNouvelEleve] = useState({
    id_parent: '',
    id_eleve: '',
    nom: '',
    prenom: '',
    dateN: '',
    typeRelation: '',
    activation: true
  });

  useEffect(() => {
    fetchEleves();
  }, []);

  const fetchEleves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/affich_eleves_Parent_conform');
      console.log('Fetched students:', response.data.eleves);
      if (response.data && response.data.eleves) {
        setEleves(response.data.eleves);
      } else {
        console.error('Erreur: Aucune donnée d\'élève trouvée dans la réponse.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des élèves:', error);
    }
  };

  const imprimerEleve = (eleve) => {
    const contenuImprimer = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h1 style="text-align: center; margin-bottom: 20px;">Information sur l'élève</h1>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #000;">
        <tr>
          <td style="padding: 10px; border: 1px solid #000;">Numéro d'identification de parent</td>
          <td style="padding: 10px; border: 1px solid #000;">${eleve.id_parent}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #000;">Numéro d'identification d'élève</td>
          <td style="padding: 10px; border: 1px solid #000;">${eleve.id_eleve}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #000;">Nom</td>
          <td style="padding: 10px; border: 1px solid #000;">${eleve.nom}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #000;">Prénom</td>
          <td style="padding: 10px; border: 1px solid #000;">${eleve.prenom}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #000;">Date de naissance</td>
          <td style="padding: 10px; border: 1px solid #000;">${eleve.dateN}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #000;">Type de relation</td>
          <td style="padding: 10px; border: 1px solid #000;">${eleve.typeRelation}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #000;">Activation</td>
          <td style="padding: 10px; border: 1px solid #000;">${eleve.activation ? 'Désactivé' : 'Activé'}</td>
        </tr>
      </table>
    </div>
  `;
  

    const fenetreImpression = window.open('_blank');
    fenetreImpression.document.write(contenuImprimer);
    fenetreImpression.print();
    fenetreImpression.close();
  };

  const ouvrirFenetreAjoutEleve = () => {
    setModalVisible(true);
  };

  const fermerModal = () => {
    setModalVisible(false);
    setNouvelEleve({
      id_parent: '',
      id_eleve: '',
      nom: '',
      prenom: '',
      dateN: '',
      typeRelation: '',
      activation: true
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNouvelEleve(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the age of the student
    const today = new Date();
    const birthDate = new Date(nouvelEleve.dateN);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 9) {
      alert("L'élève doit avoir au moins 9 ans.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/eleves_Parent', nouvelEleve);
      console.log('New student added:', response.data);
      alert("success");
      // Update the student list with the new student added at the same time
      setEleves([...eleves, response.data]);
      fermerModal();
      alert("Enregistré avec succès. Vous devez imprimer le formulaire et confirmer votre inscription auprès de l'établissement.");
    } catch (err) {
      console.log('Erreur lors de l\'ajout de l\'élève:', err);
    }
  };

  return (
    <div>
      {!modalVisible && (
        <div>
          <h1>Liste des élèves
            <button className='addEleve' onClick={ouvrirFenetreAjoutEleve}> ajouter Eleve <IoPersonAddOutline /> </button>
          </h1>
          <table>
            <thead>
              <tr>
                <th>id de parent</th>
                <th>id d'eleve</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Type de relation</th>
                <th>Activation</th>
                <th>Imprimer</th>
              </tr>
            </thead>
            <tbody>
              {eleves.length === 0 ? (
                <tr>
                  <td colSpan="8">Aucun élève trouvé</td>
                </tr>
              ) : (
                eleves.map((eleve, index) => (
                  <tr key={index}>
                    <td>{eleve.id_parent}</td>
                    <td>{eleve.id_eleve}</td>
                    <td>{eleve.nom}</td>
                    <td>{eleve.prenom}</td>
                    <td>{new Date(eleve.dateN).toLocaleDateString()}</td>
                    <td>{eleve.typeRelation}</td>
                    <td>{eleve.activation ? <><FaTimes style={{ color: 'red' }}/>Désactivé</> :
                      <> <FaCheck style={{ color: 'green' }} />Activé</>}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="imprimer-button" onClick={() => imprimerEleve(eleve)}>
                        Imprimer <ImPrinter />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {modalVisible && (
        <div className="modal1">
          <div className="modal-content1">
            <span className="close" onClick={fermerModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td><label>Numéro d'identification de parent:</label></td>
                    <td>
                      <input 
                        type="text" 
                        name="id_parent" 
                        value={nouvelEleve.id_parent} 
                        placeholder="id de parent" 
                        onChange={handleChange} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Numéro d'identification d'eleve:</label></td>
                    <td>
                      <input 
                        type="text" 
                        name="id_eleve" 
                        value={nouvelEleve.id_eleve} 
                        placeholder="id de l'élève" 
                        onChange={handleChange} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Nom:</label></td>
                    <td>
                      <input 
                        type="text" 
                        name="nom" 
                        value={nouvelEleve.nom} 
                        placeholder="nom de l'élève" 
                        onChange={handleChange} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Prénom:</label></td>
                    <td>
                      <input 
                        type="text" 
                        name="prenom" 
                        value={nouvelEleve.prenom} 
                        placeholder="prenom de l'élève" 
                        onChange={handleChange} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Date de naissance:</label></td>
                    <td>
                      <input 
                        type="date" 
                        name="dateN" 
                        value={nouvelEleve.dateN} 
                        placeholder="dateN de l'élève" 
                        onChange={handleChange} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Type de relation:</label></td>
                    <td className='select-container'>
                      <select 
                        className='select33'
                        name="typeRelation" 
                        value={nouvelEleve.typeRelation} 
                        onChange={handleChange}
                      >
                        <option value="">Sélectionnez le type de relation</option>
                        <option value="Père">Père</option>
                        <option value="Mère">Mère</option>
                        <option value="Agent">Agent</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <button className="add-button" type="submit">Ajouter</button>
                      <button className="add-button" type="button" onClick={fermerModal}>Annuler</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EleveParent;
