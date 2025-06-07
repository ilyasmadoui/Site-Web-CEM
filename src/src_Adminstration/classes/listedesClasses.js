import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import '../Design.css';
import { useHistory } from 'react-router-dom';
import back from '../pic/back.png';

const ListesClasses = () => {
  const [listClasses, setListClasses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const [newSectionName, setNewSectionName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedEnsg, setSelectedEnsg] = useState([]);

  const [dataB, setData] = useState([]);
  const [dataEnsg, setDataEnsg] = useState([]);

  const [showClassTable, setShowClassTable] = useState(true);
  const [addStudent, setAddStudent] = useState(false);
  const [addTeacher, setAddTeacher] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/listClasses');
      setListClasses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSection = async () => {
    
    if (selectedLevel) {       
       const sectionName = `${selectedLevel}${listClasses[selectedLevel].length + 1}`;

      const confirmed = window.confirm(`Confirmez-vous l'ajout' de la classe ${sectionName} ?`);
      if (confirmed) {
      try {
        await axios.put('http://localhost:5000/listClasses/ajouterClasse', {
          niveau: selectedLevel,
          classes: sectionName,
        });
        fetchData();
      } catch (error) {
        console.error('Error adding section:', error);
      }
    }}
  };
  
  const fetchStudentData = async () => {
    console.log("s ="+selectedLevel);
   if(selectedLevel){
     try {
      
      const response = await axios.get(`http://localhost:5000/Liste/${selectedLevel}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }}
  };

  const fetchDataEnsg = async () => {
    try {
      const response = await axios.get('http://localhost:5000/LesProf');
      console.log(response.data);
      setDataEnsg(response.data.class);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    
      fetchStudentData();
      fetchDataEnsg(); 
  }, [selectedLevel]);

  const handleStudentClick = student => {
    const updatedStudents = [...selectedStudents];
    const index = updatedStudents.findIndex(s => s.id_eleve === student.id_eleve);
    if (index === -1) {
      updatedStudents.push(student);
    } else {
      updatedStudents.splice(index, 1);
    }
    setSelectedStudents(updatedStudents);
  };

  const handleEnsClick = ensg => {
    const updatedEnsg = [...selectedEnsg];
    const index = updatedEnsg.findIndex(s => s.id_prof === ensg.id_prof);
    if (index === -1) {
      updatedEnsg.push(ensg);
    } else {
      updatedEnsg.splice(index, 1);
    }
    setSelectedEnsg(updatedEnsg);
  };


  const handleAddStudents = async (sectionName, levelName) => {
    setAddStudent(true);
    setAddTeacher(false);
    setShowClassTable(false);
    setSelectedSection(sectionName);
    setSelectedLevel(levelName);
    fetchStudentData();
  };

  const handleAddTeachers = async (sectionName, levelName) => {
    setAddStudent(false);
    setAddTeacher(true);
    setShowClassTable(false);
    setSelectedSection(sectionName);
    setSelectedLevel(levelName);
    fetchDataEnsg();
  };

  const backFunction = async () => {
    setAddStudent(false);
    setShowClassTable(true);
    setAddTeacher(false);
    setSelectedSection('');
    setSelectedStudents([]);
    setDataEnsg([]); // Clear selected students when going back
  };

  const handleAddSelectedStudents = async () => {
    try {
      console.log("section : "+selectedSection);

      if(selectedSection){
        const confirmed = window.confirm(`Confirmez-vous l'ajout  de l'élèves dans ${newSectionName} ?`);
        if (confirmed) {
      await axios.post(`http://localhost:5000/listClasses/ajouterEleve/${selectedSection}`, {
        section: newSectionName,
        students: selectedStudents.map(s => s.id_eleve),
      });
      setSelectedStudents([]);
      fetchStudentData(); // Refresh student data after adding students
    }}
    } catch (error) {
      console.error('Error adding students to section:', error);
    }
  };

  const handleAddSelectedEnsg = async () => {
    try {
      console.log("section : "+selectedSection);

      if(selectedSection){
        if(selectedSection){
          const confirmed = window.confirm(`Confirmez-vous l'ajout  de l'ensigiants dans ${newSectionName} ?`);
          if (confirmed) {
      await axios.post(`http://localhost:5000/lesProf/${selectedSection}`, {
        profs: selectedEnsg.map(s => s.id_prof),
      });
      setSelectedEnsg([]);
      fetchDataEnsg(); // Refresh student data after adding students
    }}
    }} catch (error) {
      console.error('Error adding students to section:', error);
    }
  };

  

  const handleRemoveClass = sectionName => async () => {
    console.log("s"+sectionName);
    const confirmed = window.confirm(`Confirmez-vous la suppression de la classe ${sectionName} ?`);
    if (confirmed) {
    try {
      await axios.delete('http://localhost:5000/listClasses/supprimerClasse', {
        data: { classes: sectionName },
      });
      fetchData();
    } catch (error) {
      console.error('Error removing section:', error);
    }}
  };

  return (
    
        <div className="rightContent">
          {showClassTable && (
            <div>
              <h2>Informations sur les classes</h2>
              <div className="addSectionForm">
                <label>Ajouter une classe :</label> <br />
                <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                  <option value="">Selectionner le niveau </option>
                  {Object.keys(listClasses).map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <button onClick={handleAddSection}>Ajouter</button>
              </div>
              <table className="tableClass">
                <thead>
                  <tr className='thClass'>
                    <th>Niveau</th>
                    <th>Classe</th>
                    <th>Nombre de garçons</th>
                    <th>Nombre de filles</th>
                    <th>Nombre d'élèves</th>

                    <th colSpan={3}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(listClasses).map(level =>
                    listClasses[level].map((section, index) => (
                      <tr key={section.id}>
                        {index === 0 && <td className='ClassNiveau' rowSpan={listClasses[level].length}>{level}</td>}
                        <td>{section.classes}</td>
                        <td>{section.nbr_musc}</td>
                        <td>{section.nbr_feme}</td>
                        <td>{section.total_nbr}</td>
                        <td>
                          <button
                            className="btnajou"
                            onClick={() => handleAddStudents(section.classes, section.niveau)}
                          >
                            Ajouter des eleves
                          </button>
                        </td>
                        <td>
                          <button
                            className="btnajou"
                            onClick={() => handleAddTeachers(section.classes, section.niveau)}
                          >
                            Ajouter des Enseignants
                          </button>
                        </td>
                        <td>
                          <button
                            className="btnSupp"
                            onClick={handleRemoveClass(section.classes)}
                          >
                            Supprimer la classe
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          {addStudent && (
            <div>
              <img className="imgBack" onClick={() => backFunction()} srcSet={back} alt="Back" />
              <h2>Ajouter des eleves</h2>
              
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Date de naissance</th>
                    <th>Classe</th>
                    <th>Sexe</th>
                    <th>Action</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {dataB.map(item => (
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
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents.some(s => s.id_eleve === item.id_eleve)}
                          onChange={() => handleStudentClick(item)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='saveDiv'>    
              <button className='send' onClick={handleAddSelectedStudents}>Ajouter les élèves</button>
            </div>
            </div>
          )}
          {addTeacher && (
            <div>
              
              <img className="imgBack" onClick={() => backFunction()} srcSet={back} alt="Back" />
              <h2>Ajouter des enseignants</h2>
              
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Date de naissance</th>
                    <th>Matiere</th>
                    <th>Sexe</th>
                    <th>Classes</th>
                    <th>Action</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                {dataEnsg && dataEnsg.length > 0 ? (
  dataEnsg.map(item => (
    <tr key={item.id_prof}>
      <td>{item.id_prof}</td>
      <td>{item.nom_arabe}</td>
      <td>{item.prenom_arabe}</td>
      <td>{item.date_naissance}</td>
      <td>{item.matiere}</td>
      <td>{item.sexe}</td>
      <td>{item.classes}</td>
      <td>
        <button onClick={() => handleStudentClick(item)}>Details</button>
      </td>
      <td>
        <input
          type="checkbox"
          checked={selectedEnsg.some(s => s.id_prof === item.id_prof)}
          onChange={() => handleEnsClick(item)}
        />
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="9">Aucune donnée disponible</td>
  </tr>
)}

                </tbody>
              </table>
              <div className='saveDiv'>    
              <button className='send' onClick={handleAddSelectedEnsg}>Ajouter les enseignants</button>
            </div>
            </div>
          )}
        </div>
    
  );
};

export default ListesClasses;
