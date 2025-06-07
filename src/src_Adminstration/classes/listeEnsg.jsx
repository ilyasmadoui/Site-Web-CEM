import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Assuming you have installed react-modal
import '../Design.css';
import { MdModeEdit } from "react-icons/md";

function ListEleve() {
  const [dataB, setData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [listEns, setListEns] = useState(null);
  const [listEnsClasses, setListEnsClasses] = useState(null);
  const [searchResult, setSearchResult] = useState({});
  const [classeData, setClasseData] = useState(null); 
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({}); // Change to {}
  const[joutHeure,setJourHeure]=useState({
    jour:'',heure:''
  })
  const [level, setLevel] = useState('');
  const [section, setSection] = useState('');
  const [sections, setSections] = useState([]);


  const fetchDataSections = async () => {
    try {
      if (level) {
        const http = `http://localhost:5000/emploisDeTemps/classes/${level}`;
        const response = await axios.get(http);
        const data = response.data;
        setSections(data.classes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataSections();
  }, [level]);


  

  const fetchDataEnsg = async () => {
    try {
      const response = await axios.get('http://localhost:5000/LesProf');
      setListEns(response.data.class);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchDataEnsg();
  }, []);

 

 

  const handleStudentClick = student => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const handleEdit = student => {
    setSelectedStudent(student);
    setEditOpen(true);
    const words=student.disponible.split(" ");
    console.log(words);
    setEditedData({
      jour:words[0], 
      heure: words[1], 
    });
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
    setDetailsOpen(false);
    setEditOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/editProf/${selectedStudent.id_prof}`, editedData);
      
      setEditedData({
        jour: '', 
        heure: '' 
      });
      setEditOpen(false);
      fetchDataEnsg();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  const filteredData = listEns
  ? listEns.filter(
      item =>
        (level === '' || item.classes.includes(level)) &&
        (section === '' || item.classes.includes(section)) &&
        (searchInput === '' ||
          item.nom_arabe.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.prenom_arabe.toLowerCase().includes(searchInput.toLowerCase()))
    )
  : [];



  return (
    <div className='rightContent'>
      <div className="topInfo">
        <h1>Liste des enseignants :</h1>
        <div className="fltring">
          <div className='Fltr'>
          <select className='select2' value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="">Choisir le niveau</option>
                <option value="1AM">1AM</option>
                <option value="2AM">2AM</option>
                <option value="3AM">3AM</option>
                <option value="4AM">4AM</option>
              </select>
              <select className='select2' value={section} onChange={(e) => setSection(e.target.value)}>
                <option value="">Choisir le section</option>
                {sections.map((item, index) => (
                  <option key={index} value={item.classes}>{item.classes}</option>
                ))}
              </select>
          </div>
          <input
            type='text'
            placeholder='Rechercher'
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
            <th>Matiere</th>
            <th>Sexe</th>
            <th>Classes</th>
            <th>Disponible</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id_prof}>
              <td>{item.id_prof}</td>
              <td>{item.nom_arabe}</td>
              <td>{item.prenom_arabe}</td>
              <td>{item.date_naissance}</td>
              <td>{item.matiere}</td>
              <td>{item.sexe}</td>
              <td>{item.classes}</td>            
              <td>{item.disponible}
                <button onClick={() => handleEdit(item)}><MdModeEdit /></button>
              </td>
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
        >
          <button className='fermer' onClick={handleCloseDetails} style={{position: 'absolute', top: '10px', right: '10px'}}><b>X</b></button>
          <h2 className='h3-navbar-inscrire'>Détails de l'enseignant</h2>
          <div className="modal-content">
            <p><strong>Id:</strong> {selectedStudent.id_prof}</p>
            <p><strong>Nom (Arabe):</strong> {selectedStudent.nom_arabe}</p>
            <p><strong>Nom (Français):</strong> {selectedStudent.nom_francais}</p>
            <p><strong>Prénom (Arabe):</strong> {selectedStudent.prenom_arabe}</p>
            <p><strong>Prénom (Français):</strong> {selectedStudent.prenom_francais}</p>
            <p><strong>Date de naissance:</strong> {selectedStudent.date_naissance}</p>
            <p><strong>Lieu de naissance:</strong> {selectedStudent.lieu_naissance}</p>
            <p><strong>Matière:</strong> {selectedStudent.matiere}</p>
            <p><strong>Sexe:</strong> {selectedStudent.sexe}</p>
            <p><strong>Classes:</strong> {selectedStudent.classes}</p>
          </div>
        </Modal>
      )}
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
          isOpen={editOpen}
          onRequestClose={handleCloseDetails}
        >
          <button className='fermer' onClick={handleCloseDetails} style={{position: 'absolute', top: '10px', right: '10px'}}><b>X</b></button>
          <h2 className='h3-navbar-inscrire'>Modifier les détails de l'enseignant</h2>
          <div className="modal-content-edit">
            <form onSubmit={handleSave}>
              <div>
                <label>Jour:</label>
                <select value={editedData.jour} onChange={(e) => setEditedData({ ...editedData, jour: e.target.value })}>
                  <option value="dimanche">Dimanche</option>
                  <option value="lundi">Lundi</option>
                  <option value="mardi">Mardi</option>
                  <option value="mercredi">Mercredi</option>
                  <option value="jeudi">Jeudi</option>
                </select>
              </div>
              <div>
                <label>Heure:</label>
                <select value={editedData.heure} onChange={(e) => setEditedData({ ...editedData, heure: e.target.value })}>
                  <option value="08:00">08:00-09:00</option>
                  <option value="09:00">09:00-10:00</option>
                  <option value="10:00">10:00-11:00</option>
                  <option value="11:00">11:00-12:00</option>
                  <option value="14:00">14:00-15:00</option>
                  <option value="15:00">15:00-16:00</option>
                  <option value="16:00">16:00-17:00</option>
                </select>
              </div>
              <div className="editbtn">
                <button type="submit">Enregistrer</button>
              </div> 
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ListEleve;
