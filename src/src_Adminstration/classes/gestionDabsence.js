import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Design.css';
import Header from './Header';
import { Link } from "react-router-dom";

const GestionDabsence = () => {
  const [dataB, setData] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [selectAllMatin, setSelectAllMatin] = useState(false);
  const [selectAllApresMidi, setSelectAllApresMidi] = useState(false);
  const optionsAnnee = ['1AM', '2AM', '3AM', '4AM'];
  
  const [selectedtimeApreMidi, setSelectedtimeApreMidi] = useState([]);
  const [selectedtimeMatin, setSelectedtimeMatin] = useState([]);
  const [absentHours, setAbsentHours] = useState({});

  const [level, setLevel] = useState('');
  const [section, setSection] = useState('');
  const [sections, setSections] = useState([]);
  const [searchInput, setSearchInput] = useState('');


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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Liste');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTimeChange = (time, isChecked, setSelectedtime, selectedtime, setSelectAll, student, nbr) => {
    let updatedTime = [];
    if (isChecked) {
      updatedTime = [...selectedtime, time];
    } else {
      updatedTime = selectedtime.filter(item => item !== time);
    }
  
    setSelectedtime(updatedTime);
  
    setAbsentHours(prevState => {
      const newState = { ...prevState };
      if (!newState[student.id_eleve]) {
        newState[student.id_eleve] = {}; 
      }
  
      if (isChecked) {
        newState[student.id_eleve] = {
          ...newState[student.id_eleve],
          [time]: true
        };
      } else {
        delete newState[student.id_eleve][time];
        if (Object.keys(newState[student.id_eleve]).length === 0) {
          delete newState[student.id_eleve];
        }
      }
      return newState;
    });
  
    if (updatedTime.length === nbr) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };
  

  const handlePresenceChange = (id, presence) => {
    if (presence === 'absent' && !absentStudents.includes(id)) {
      setAbsentStudents([...absentStudents, id]);
    } else if (presence === 'present' && absentStudents.includes(id)) {
      setAbsentStudents(absentStudents.filter(studentId => studentId !== id));
      setAbsentHours(prevState => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
    }
  };

  const handleSelectAllMatin = () => {
    const allTimes = ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00"];
    if (selectAllMatin) {
      setSelectedtimeMatin([]);
    } else {
      setSelectedtimeMatin(allTimes);
    }
    setSelectAllMatin(!selectAllMatin);
  };

  const handleSelectAllApresMidi = () => {
    const allTimes = ["14:00-15:00", "15:00-16:00", "16:00-17:00"];
    if (selectAllApresMidi) {
      setSelectedtimeApreMidi([]);
    } else {
      setSelectedtimeApreMidi(allTimes);
    }
    setSelectAllApresMidi(!selectAllApresMidi);
  };


  const generateAbsenceReport = () => {
    const report = dataB.map(student => {
      if (absentStudents.includes(student.id_eleve)) {
        const times = absentHours[student.id_eleve] ? Object.keys(absentHours[student.id_eleve]) : [];
        return {
          id_parent: student.id_parent,
          message: `Liste des heures d'absence:
          - Élève: ${student.nom_francais} ${student.prenom_francais} (ID: ${student.id_eleve})
          - Heures d'absence: ${times.join(', ')}`
        };
      }
      return null;
    }).filter(item => item !== null);
    
    return report;
  };

  const sendAbsenceReport = async () => {
    const confirmed = window.confirm(`Confirmez-vous l'envoi du rapport d'absence ?`);
        if (confirmed) {
    const report = generateAbsenceReport();
    console.log(report);
    try {
      await axios.post('http://localhost:5000/SendAbsenceReport', { report });
      alert('Absence report sent successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error sending absence report:', error);
    }}

  };

  const filteredData = dataB
    ? dataB.filter(
        item =>
          (level === '' || item.niveau === level) &&
          (section === '' || item.section === section) &&
          (searchInput === '' ||
            item.nom_arabe.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.prenom_arabe.toLowerCase().includes(searchInput.toLowerCase()))
      )
    : [];

  return (
     
        <div className='rightContent'>
          <h1>Liste des éleves :</h1>
          <div className='Fltr'>
            <div className='filtre'>
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
          <table className='table'>
            <thead>
              <tr>
                <th>Jour</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Classe</th>
                <th>Sexe</th>
                <th>Présence</th>
                <th>Absence</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <React.Fragment key={item.id_eleve}>
                    <tr>
                      <td>{item.id_eleve}</td>
                      <td>{item.nom_arabe}</td>
                      <td>{item.prenom_arabe}</td>
                      <td>{item.date_naissance}</td>
                      <td>{item.section}</td>
                      <td>{item.sexe}</td>
                      <td>
                        <input
                          type="radio"
                          name={`presence_${item.id_eleve}`}
                          value="present"
                          onChange={() => handlePresenceChange(item.id_eleve, 'present')}
                          checked={!absentStudents.includes(item.id_eleve)}
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          name={`presence_${item.id_eleve}`}
                          value="absent"
                          onChange={() => handlePresenceChange(item.id_eleve, 'absent')}
                          checked={absentStudents.includes(item.id_eleve)}
                        />
                      </td>
                    </tr>
                    {absentStudents.includes(item.id_eleve) && (
                      <>
                        <tr>
                          <td colSpan={8}>
                            <div className='chooseDiv'>
                              <b>Matin : </b>
                              <div>
                                <input type="checkbox" name={`matin_${item.id_eleve}_08:00-09:00`} value="08:00-09:00" onChange={e => handleTimeChange(e.target.value, e.target.checked, setSelectedtimeMatin, selectedtimeMatin, setSelectAllMatin, item, 4)} disabled={selectAllMatin} />
                                <label className="choose" htmlFor={`matin_${item.id_eleve}_08:00-09:00`}>08:00-09:00</label>
                                <input type="checkbox" name={`matin_${item.id_eleve}_09:00-10:00`} value="09:00-10:00" onChange={e => handleTimeChange(e.target.value, e.target.checked, setSelectedtimeMatin, selectedtimeMatin, setSelectAllMatin, item, 4)} disabled={selectAllMatin}  />
                                <label className="choose" htmlFor={`matin_${item.id_eleve}_09:00-10:00`}>09:00-10:00</label>
                                <input type="checkbox" name={`matin_${item.id_eleve}_10:00-11:00`} value="10:00-11:00" onChange={e => handleTimeChange(e.target.value, e.target.checked, setSelectedtimeMatin, selectedtimeMatin, setSelectAllMatin, item, 4)} disabled={selectAllMatin}  />
                                <label className="choose" htmlFor={`matin_${item.id_eleve}_10:00-11:00`}>10:00-11:00</label>
                                <input type="checkbox" name={`matin_${item.id_eleve}_11:00-12:00`} value="11:00-12:00" onChange={e => handleTimeChange(e.target.value, e.target.checked, setSelectedtimeMatin, selectedtimeMatin, setSelectAllMatin, item, 4)} disabled={selectAllMatin} checked={selectedtimeMatin.includes("11:00-12:00")} />
                                <label className="choose" htmlFor={`matin_${item.id_eleve}_11:00-12:00`}>11:00-12:00</label>
                               
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={8}>
                            <div className='chooseDiv'>
                              <b>Après-midi :</b>
                              <div>
                                <input type="checkbox" name={`apresMidi_${item.id_eleve}_14:00-15:00`} value="14:00-15:00" onChange={e => handleTimeChange(e.target.value, e.target.checked, setSelectedtimeApreMidi, selectedtimeApreMidi, setSelectAllApresMidi, item, 3)}  />
                                <label className="choose" htmlFor={`apresMidi_${item.id_eleve}_14:00-15:00`}>14:00-15:00</label>
                                <input type="checkbox" name={`apresMidi_${item.id_eleve}_15:00-16:00`} value="15:00-16:00" onChange={e => handleTimeChange(e.target.value, e.target.checked, setSelectedtimeApreMidi, selectedtimeApreMidi, setSelectAllApresMidi, item, 3)}  />
                                <label className="choose" htmlFor={`apresMidi_${item.id_eleve}_15:00-16:00`}>15:00-16:00</label>
                                <input type="checkbox" name={`apresMidi_${item.id_eleve}_16:00-17:00`} value="16:00-17:00" onChange={e => handleTimeChange(e.target.value, e.target.checked, setSelectedtimeApreMidi, selectedtimeApreMidi, setSelectAllApresMidi, item, 3)}  />
                                <label className="choose" htmlFor={`apresMidi_${item.id_eleve}_16:00-17:00`}>16:00-17:00</label>
                      
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="8"></td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='saveDiv'>         
              <button  className='send' onClick={sendAbsenceReport}>Envoyer le rapport d'absence</button>
              </div>
        </div>
     
  );
};

export default GestionDabsence;


