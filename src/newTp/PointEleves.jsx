import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../src_Adminstration/Design.css';
import { FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const PointEleves = () => {
  const [students, setStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({
    intero1: 0,
    intero2: 0,
    control: 0,
  });
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const tableRef = useRef(null);
  const [semester, setSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountId, setAccountId] = useState(null);
  const [profMatiere, setProfMatiere] = useState(null);
  const [teacherSemester, setTeacherSemester] = useState("semestre 01");

  let email = localStorage.getItem('email');

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

  const fetchData = async () => {
    if (accountId) {
      try {
        const response = await axios.get(`http://localhost:5000/profff/${accountId}`);
        const teacherClasses = response.data.classes.split(',').map(cls => cls.trim());
        const studentsResponse = await axios.get('http://localhost:5000/studentsss');
        const filteredStudents = studentsResponse.data.filter(student =>
          teacherClasses.includes(student.secion) &&
          student.modules === profMatiere &&
          student.semestre === teacherSemester &&
          (semester ? student.semestre === semester : true)
        );
        setStudents(filteredStudents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    if (email) {
      fetchAccountId(email);
    }
  }, [email]);

  useEffect(() => {
    fetchData();
  }, [accountId, semester, profMatiere, teacherSemester]);

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    setTeacherSemester(selectedSemester);
  };

  const openModal = (student, rowElement) => {
    const rect = rowElement.getBoundingClientRect();
    setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setCurrentStudent(student);
    setFormData({
      intero1: parseFloat(student.interro1) || 0,
      intero2: parseFloat(student.interro2) || 0,
      control: parseFloat(student.control) || 0,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchProfMatiere = async (accountId) => {
      try {
        const response = await axios.get(`http://localhost:5000/prof_detailss?accountId=${accountId}`);
        setProfMatiere(response.data.matiere);
      } catch (error) {
        console.error('Error fetching professor matiere:', error);
      }
    };

    if (accountId) {
      fetchProfMatiere(accountId); // Fetch professor matiere based on account ID
    }
  }, [accountId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue <= 20) {
      setFormData({ ...formData, [name]: parsedValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérification si l'une des notes d'interro est supérieure à zéro
    if (formData.intero1 == 0 || formData.intero2 == 0) {
      try {
        const updatedData = {
          interro1: parseFloat(formData.intero1),
          interro2: parseFloat(formData.intero2),
          control: parseFloat(formData.control),
        };
        await axios.post(`http://localhost:5000/updateStudent/${currentStudent.id}`, updatedData);
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student.id === currentStudent.id
              ? { ...student, ...updatedData }
              : student
          )
        );
        closeModal();
      } catch (error) {
        console.error('Error updating student data:', error);
      }
    } else {
      // Afficher un message d'erreur ou une alerte si aucune note d'interro n'est supérieure à zéro
      alert("Veuillez saisir au moins une note d'interro pour enregistrer les modifications.");
    }
  };

  const filteredStudents = students.filter(student =>
    student.nom_arab.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='rightContent'>
      <h1>Liste des étudiants :</h1>
         <div className="search-container">
        <input
            className="rechercher"
            type="text"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
        </div>
        <div className="filtre">
        <select id="select2" value={semester} onChange={handleSemesterChange}>
          <option value="">Choisir le niveau </option>
          <option value="semestre 01">semestre 01</option>
          <option value="semestre 02">semestre 02</option>
          <option value="semestre 03">semestre 03</option>
        </select>
      </div>
      <table className='table' ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Intero 1</th>
            <th>Intero 2</th>
            <th>Control</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id_eleve}>
                <td>{student.id_eleve}</td>
                <td>{student.nom_arab}</td>
                <td>{student.prenom_arab}</td>
                <td>{student.interro1 || ''}</td>
                <td>{student.interro2 || ''}</td>
                <td>{student.control || ''}</td>
                <td>
                  <button onClick={(e) => openModal(student, e.currentTarget.closest('tr'))}>Modifier</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Chargement...</td>
            </tr>
          )}
        </tbody>
      </table>

      {modalIsOpen && (
        <div className="modal">
          <h2>Modifier Étudiant</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="intero1">Intero 1:</label>
              <input type="number" id="intero1" name="intero1" value={formData.intero1} onChange={handleInputChange} required max="20" min="0" />
            </div>
            <div>
              <label htmlFor="intero2">Intero 2:</label>
              <input type="number" id="intero2" name="intero2" value={formData.intero2} onChange={handleInputChange} required max="20" min="0" />
            </div>
            <div>
              <label htmlFor="control">Control:</label>
              <input type="number" id="control" name="control" value={formData.control} onChange={handleInputChange} required max="20" min="0" />
            </div>
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={closeModal}>Annuler</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PointEleves;
