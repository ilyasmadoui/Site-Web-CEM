import React, { useEffect, useState } from 'react';
import axios from 'axios'; // استيراد مكتبة axios
import Modal from 'react-modal'; // استيراد مكون Modal
import '../Design.css';

function ListEleve() {
  const [dataB, setData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false); // حالة جديدة للـ Modal
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

  const handleCloseDetails = () => {
    setSelectedStudent(null);
    setDetailsOpen(false); // إغلاق الـ Modal عند الضغط على زر الإغلاق
  };

  const optionsAnnee = ['1AM', '2AM', '3AM', '4AM'];

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Liste');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = dataB
    ? dataB.filter(
        item =>
          (level === '' || item.niveau === level) &&
          (section === '' || item.classe === section) &&
          (searchInput === '' ||
            item.nom_arabe.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.prenom_arabe.toLowerCase().includes(searchInput.toLowerCase()))
      )
    : [];

  const handleStudentClick = student => {
    setSelectedStudent(student);
    setDetailsOpen(true); // فتح الـ Modal عند النقر على زر التفاصيل
  };

  return (
    <div className='rightContent'>
      <div className="topInfo">
        <h1>Liste des élèves :</h1>
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
            <th>Class</th>
            <th>Sexe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id_eleve}>
              <td>{item.id_eleve}</td>
              <td>{item.nom_arabe}</td>
              <td>{item.prenom_arabe}</td>
              <td>{item.date_naissance}</td>
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
        >
          <button className='fermer' onClick={handleCloseDetails} style={{position: 'absolute', top: '10px', right: '10px'}}><b>X</b></button>
          <h2 className='h3-navbar-inscrire'>Détails de l'élève</h2>
          <div className="modal-content">
            <p><strong>Id:</strong> {selectedStudent.id_eleve}</p>
            <p><strong>Nom (Arabe):</strong> {selectedStudent.nom_arabe}</p>
            <p><strong>Nom (Français):</strong> {selectedStudent.nom_francais}</p>
            <p><strong>Prénom (Arabe):</strong> {selectedStudent.prenom_arabe}</p>
            <p><strong>Prénom (Français):</strong> {selectedStudent.prenom_francais}</p>
            <p><strong>Date de naissance:</strong> {selectedStudent.date_naissance}</p>
            <p><strong>Lieu de naissance:</strong> {selectedStudent.lieu_naissance}</p>  
            <p><strong>Sexe:</strong> {selectedStudent.sexe}</p>
            <p><strong>Niveau:</strong> {selectedStudent.classe}</p>
            <p><strong>Classe:</strong> {selectedStudent.section}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ListEleve;

