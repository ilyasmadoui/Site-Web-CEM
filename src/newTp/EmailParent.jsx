import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src_Adminstration/Design.css';
import { FaSearch } from 'react-icons/fa';
import Modal from 'react-modal'; // Assuming you have installed react-modal
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root'); // Make sure to set the app element for accessibility

function EmailParent() {
  const [dataB, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [listEns, setListEns] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Liste');
        setData(response.data);
        console.log('Liste data:', response.data); // Debugging line
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataEnsg = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/eleves-parents');
        setListEns(response.data);
        console.log('Eleves-parents data:', response.data); // Debugging line
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchDataEnsg();
  }, []);

  useEffect(() => {
    console.log('ListEns data:', listEns); // Debugging line
  }, [listEns]);

  const filteredData = listEns.filter(
    item =>
      (selectedNiveau === '' || item.niveau === selectedNiveau) &&
      (selectedClasse === '' || item.classe === selectedClasse) &&
      (searchInput === '' || item.nomAr.toLowerCase().includes(searchInput.toLowerCase()))
  );

  useEffect(() => {
    console.log('Filtered data:', filteredData); // Debugging line
  }, [filteredData]);

  const handleStudentClick = student => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
    setDetailsOpen(false);
  };

  return (
    <div className='rightContent'>
      <div className="topInfo">
        <h1>Email de parent :</h1>
        <div className="search-container17">
          <input
            className="rechercher17"
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
            <th>Id étudiant</th>
            <th>Nom étudiant</th>
            <th>Prénom étudiant</th>
            <th>Id parent</th>
            <th>Nom parent</th>
            <th>Prénom parent</th>
            <th>Email parent</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id_eleve}>
              <td>{item.id_eleve}</td>
              <td>{item.nomeleve}</td>
              <td>{item.prenomeleve}</td>
              <td>{item.id_parent}</td>
              <td>{item.nomparent}</td>
              <td>{item.premonparent}</td>
              <td>
                <a href={`mailto:${item.emailparent}`}>{item.emailparent}</a>
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
          contentLabel="Détails de l'étudiant"
        >
          <button className='fermer' onClick={handleCloseDetails} style={{position: 'absolute', top: '10px', right: '10px'}}><b>X</b></button>
          <h2 className='h3-navbar-inscrire'>Détails de l'étudiant</h2>
          <div className="modal-content">
            <p><strong>Id étudiant:</strong> {selectedStudent.id_eleve}</p>
            <p><strong>Nom étudiant (Arabe):</strong> {selectedStudent.nomeleve}</p>
            <p><strong>Prénom étudiant (Arabe):</strong> {selectedStudent.prenomeleve}</p>
            <p><strong>Id parent:</strong> {selectedStudent.id_parent}</p>
            <p><strong>Nom parent:</strong> {selectedStudent.nomparent}</p>
            <p><strong>Prénom parent:</strong> {selectedStudent.premonparent}</p>
            <p><strong>Email parent:</strong> {selectedStudent.emailparent}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EmailParent;
