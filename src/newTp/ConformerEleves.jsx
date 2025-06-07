import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const ConformerEleves = ({ menuActive }) => {
  const [eleves, setEleves] = useState([]);
  const [subMenuActive, setSubMenuActive] = useState(false);

  useEffect(() => {
    fetchEleves();
  }, []);

  const fetchEleves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/affich_eleves_Parent');
      console.log('Fetched students for confirmation:', response.data.eleves); // Debugging line
      if (response.data && response.data.eleves) {
        setEleves(response.data.eleves);
      } else {
        console.error('Erreur: Aucune donnée d\'élève trouvée dans la réponse.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des élèves:', error);
    }
  };

  const handleAccept = async (id_eleve) => {
    try {
      await axios.post('http://localhost:5000/eleves_parent_conforme', { id_eleve });
      alert('Élève accepté avec succès.');
      fetchEleves(); // Refresh the list
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de l\'élève:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete_eleve/${id}`);
      alert('Élève supprimé avec succès.');
      fetchEleves(); // Refresh the list
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'élève:', error);
    }
  };

  const toggleSubMenu = () => {
    setSubMenuActive(!subMenuActive);
  };

  return (
    <div className={menuActive ? 'menu-active' : ''}>
      <div className={subMenuActive ? 'sous' : ''}>
        <div id="content" className={menuActive ? 'menu-active' : ''}>
          <h1>Confirmer les élèves</h1>
          <table>
            <thead>
              <tr>
                <th>Numéro d'identification de parent</th>
                <th>Numéro d'identification d'eleve</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Type de relation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eleves.length === 0 ? (
                <tr>
                  <td colSpan="7">Aucun élève à confirmer</td>
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
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => handleAccept(eleve.id_eleve)} style={{ marginRight: '10px', color: 'green' }}>
                        <FaCheck />
                      </button>
                      <button onClick={() => handleDelete(eleve.id_eleve)} style={{ color: 'red' }}>
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ConformerEleves;
