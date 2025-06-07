import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentDetails from '../src_Adminstration/classes/StudentDetails';
import '../src_Adminstration/Design.css';
import Modal from 'react-modal'; // Assuming you have installed react-modal
import { FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root'); // Make sure to set the app element for accessibility

function ElevesEnseignat() {
  const [dataB, setData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [level, setLevel] = useState('');
  const [section, setSection] = useState('');
  const [sections, setSections] = useState([]);
  const [sexe, setSexe] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [professorDepartments, setProfessorDepartments] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [profClasses, setProfClasses] = useState(null);
  let email = localStorage.getItem('email');

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedStudent(null);
  };

  const fetchAccountId = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/compte_loginn?email=${email}`);
      if (response.data.length > 0) {
        setAccountId(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching account ID:', error);
    }
  };

  const fetchProfClasses = async (accountId) => {
    try {
      const response = await axios.get(`http://localhost:5000/proff_details?accountId=${accountId}`);
      if (response.data.length > 0) {
        setProfClasses(response.data[0].classes);
      }
    } catch (error) {
      console.error('Error fetching professor classes:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Listee');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 const fetchClasses = async () => {
    try {
      if (level) {
        const response = await axios.get(`http://localhost:5000/emploisDeTempss/classess/${level}`);
        const data = response.data;
        setSections(data.classes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
   
  useEffect(() => {
    if (email) {
      fetchAccountId(email);
    }
    fetchData();
    fetchClasses();
  }, [level, email]);

  useEffect(() => {
    if (accountId) {
      fetchProfClasses(accountId);
    }
  }, [accountId]);

  useEffect(() => {
    const departments = profClasses ? profClasses.split(",") : [];
    setProfessorDepartments(departments);
  }, [profClasses]);

  const filteredData = dataB
    ? dataB.filter(
        item =>
          (level === '' || item.niveau === level) &&
          (section === '' || item.section === section) &&
          (sexe === '' || item.sexe === sexe) &&
          (professorDepartments.length === 0 || professorDepartments.includes(item.section)) &&
          (searchInput === '' ||
            item.nom_arabe.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.prenom_arabe.toLowerCase().includes(searchInput.toLowerCase()))
      )
    : [];

  const handleStudentClick = student => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  return (
    <div className='rightContent'>
      <h1>Liste des éleves :</h1>
      <div className='Fltr'>
        <div className='filtre'>
          <select className='select2' value={level} onChange={e => setLevel(e.target.value)}>
            <option value="">Choisissez un niveau</option>
            <option value="1AM">1AM</option>
            <option value="2AM">2AM</option>
            <option value="3AM">3AM</option>
            <option value="4AM">4AM</option>
          </select>
          <select className='select2' value={section} onChange={e => setSection(e.target.value)}>
            <option value="">Sélectionnez la rubrique</option>
            {sections.map((item, index) => (
              <option key={index} value={item.classes}>{item.classes}</option>
            ))}
          </select>
          <select className='select2' value={sexe} onChange={e => setSexe(e.target.value)}>
            <option value="">Choisissez le sexe</option>
            <option value="male">Masculin</option>
            <option value="female">Feminin</option>
          </select>
        </div>
         <div className="search-container">
        <input
            className="rechercher"
            type="text"
            placeholder="Rechercher"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
        />
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Date de naissance</th>
            <th>Niveau</th>
            <th>Class</th>
            <th>Sexe</th>
            <th>Informations</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id_eleve}>
              <td>{item.id_eleve}</td>
              <td>{item.nom_arabe}</td>
              <td>{item.prenom_arabe}</td>
              <td>{item.date_naissance}</td>
              <td>{item.niveau}</td>
              <td>{item.section}</td>
              <td>{item.sexe}</td>
              <td>
                <button onClick={() => handleStudentClick(item)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
          <Modal
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000, // Ensures the modal is above other elements
              },
              content: {
                position: 'relative',
                color: '#2a4356',
                backgroundColor: 'rgb(240, 248, 255)',
                borderRadius: '8px',
                maxWidth: '600px', // Adjust width for better display
                maxHeight: '80vh', // Adjust height for better display
                margin: 'auto',
                overflow: 'auto' // Allows scrolling if content overflows
              }
            }}
            isOpen={detailsOpen}
            onRequestClose={handleCloseDetails}
            contentLabel="Détails de l'étudiant"
          >
            <button className='fermer' onClick={handleCloseDetails} style={{position: 'absolute', top: '10px', right: '10px'}}><b>X</b></button>
            <h2 className='h3-navbar-inscrire'>Détails de l'étudiant</h2>
            <div className="modal-content">
              <p><strong>Id:</strong> {selectedStudent.id_eleve}</p>
              <p><strong>Nom (Arabe):</strong> {selectedStudent.nom_arabe}</p>
              <p><strong>Nom (Français):</strong> {selectedStudent.nom_arabe}</p>
              <p><strong>Prénom (Arabe):</strong> {selectedStudent.prenom_arabe}</p>
              <p><strong>Prénom (Français):</strong> {selectedStudent.prenom_arabe}</p>
              <p><strong>Date de naissance:</strong> {selectedStudent.date_naissance}</p>
              <p><strong>Lieu de naissance:</strong> {selectedStudent.niveau}</p>
              <p><strong>Matière:</strong> {selectedStudent.section}</p>
              <p><strong>Sexe:</strong> {selectedStudent.sexe}</p>
            </div>
          </Modal>
        )}
    </div>
  );
}

export default ElevesEnseignat;
