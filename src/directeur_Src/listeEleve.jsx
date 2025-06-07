import React, { useEffect, useState } from 'react';
import axios from 'axios'; // استيراد مكتبة axios
import StudentDetails from './eleveDetails'; // استيراد مكون StudentDetails
import '../src_Adminstration/Design.css';

function ListEleve() {
  const [dataB, setData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleCloseDetails = () => {
    setSelectedStudent(null);
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
          (selectedNiveau === '' || item.niveau === selectedNiveau) &&
          (selectedClasse === '' || item.classe === selectedClasse) &&
          (searchInput === '' ||
            item.nom_arabe.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.prenom_arabe.toLowerCase().includes(searchInput.toLowerCase()))
      )
    : [];

  const handleStudentClick = student => {
    setSelectedStudent(student);
  };


  const [responseMessage, setResponseMessage] = useState('');

    const handleDelete = async (compte) => {
        console.log(compte);
        try {
            const response = await axios.delete('http://localhost:5000/Liste/deleteRequest', { data: compte });
            setResponseMessage(response.data);
            alert("accepted" + compte.id);
            window.location.reload();
        } catch (error) {
            console.error('Error accepting request:', error);
            setResponseMessage('Error accepting request');
        }
    };

  return (
      <div className='rightContent'>
         <div className="topInfo">
      <h1>Liste des élèves :</h1>
      <div className="fltring">
      <div className='Fltr'>
          <select
            className='select'
            value={selectedNiveau}
            onChange={e => setSelectedNiveau(e.target.value)}
          >
            <option value='' disabled hidden>
              Niveau d'études
            </option>
            {optionsAnnee.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className='select'
            value={selectedClasse}
            onChange={e => setSelectedClasse(e.target.value)}
          >
            <option value='' disabled hidden>
              Classe
            </option>
            {optionsAnnee.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
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
              <th>Supprimer</th>
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
                <td className="thread"><button onClick={() => handleDelete(result)}>❌</button></td>
              </tr>
            ))}
          </tbody>
        </table>
       {selectedStudent && ( <div className='modal-root'>
        
            <StudentDetails student={selectedStudent} onClose={handleCloseDetails} />
       
      </div>
     )}
      </div>
      
  );
}

export default ListEleve;
