import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import '../src_Adminstration/Design.css';
import { Link } from "react-router-dom";
import Table from "../pic/timetable.png"
import Table2 from "../pic/edit.png"
import back from "../src_Adminstration/pic/back.png"

const Emploidetemps = () => {
  const [level, setLevel] = useState('');
  const [section, setSection] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [emploiModifie, setEmploiModifie] = useState(false);
  const history = useHistory(); 

  const handleImgBackClick = () => {
    setEmploiModifie(false);
  };

  const handleSave = async () => {
    try {
      if (section) {

      const http = `http://localhost:5000/emploisDeTemps/save/${section}`;
      const response = await axios.post(http, { schedule });
      console.log("Save response:", response.data);}
      setEmploiModifie(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const renderOptions = (selectedValue) => {
    return (
      <>
        <option value="">Choisir un subject</option>
        {subjects.map((item, index) => (
          <option key={index} value={item.french_name}>{item.french_name}</option>
        ))}
      </>
    );
  };

  const handleSubjectChange = (e, index, field) => {
    const newValue = e.target.value;
    setSchedule(prevSchedule => {
      const updatedSchedule = [...prevSchedule];
      updatedSchedule[index][field] = newValue;
      return updatedSchedule;
    });
  };

  const fetchData = async () => {
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

  const fetchDataShedule = async () => {
    try {
      if (section) {
        const http = `http://localhost:5000/emploisDeTemps/classe/${section}`;
        const response = await axios.get(http);
        const data = response.data;
        setSchedule(data.schedule); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDatasubject = async () => {
    try {
      const http = `http://localhost:5000/emploisDeTemps/subjects`;
      const response = await axios.get(http);
      const data = response.data;
      setSubjects(data.subjects); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataShedule();
    fetchDatasubject();
  }, [level, section]);

  return (
    
        <div className='rightContent'>
          {!emploiModifie && (
            <div>
              <h1>L'emploi de temps :</h1>
              <div className="select-container">
  <select className='select23' value={level} onChange={(e) => setLevel(e.target.value)}>
    <option value="">Choisir le niveau</option>
    <option value="1AM">1AM</option>
    <option value="2AM">2AM</option>
    <option value="3AM">3AM</option>
    <option value="4AM">4AM</option>
  </select>
  <select className='select23' value={section} onChange={(e) => setSection(e.target.value)}>
    <option value="">Choisir la section</option>
    {sections.map((item, index) => (
      <option key={index} value={item.classes}>{item.classes}</option>
    ))}
  </select>
</div>

              <table className='emploideTemp'>
                <thead>
                  <tr className='periode'>
                    <th rowSpan={2}>Jour\Temps</th>
                    <th colSpan={4}>Période Matin</th>
                    <th colSpan={5}>Période Après-midi</th>
                  </tr>
                  <tr className='time'>
                    <th>08:00 - 09:00</th>
                    <th>09:00 - 10:00</th>
                    <th>10:00 - 11:00</th>
                    <th>11:00 - 12:00</th>
                    <th>14:00 - 15:00</th>
                    <th>15:00 - 16:00</th>
                    <th>16:00 - 17:00</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.length === 0 ? (
                    <tr key={-1}><td colSpan={11}>Le tableau est vide. Veuillez choisir la section.</td></tr>
                  ) : (
                    <>
                      {schedule.map((item, index) => (
                        <tr key={index}>
                          <td  className='day'>{item.jour}</td>
                          <td className='subject'>{item.subject1}</td>
                          <td className='subject' >{item.subject2}</td>
                          <td className='subject' >{item.subject3}</td>
                          <td className='subject' >{item.subject4}</td>
                          <td className='subject' >{item.subject5}</td>
                          <td className='subject' >{item.subject6}</td>
                          <td className='subject' >{item.subject7}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {emploiModifie && (
            <div>
              <img className='imgBack' onClick={() => handleImgBackClick()} srcSet={back} alt="Back"></img>
              <h1>Modifier l'emploi de temps :</h1>
              <table className='emploideTemp'>
                <thead>
                  <tr className='periode'>
                    <th rowSpan={2}>Jour\Temps</th>
                    <th colSpan={4}>Période Matin</th>
                    <th colSpan={5}>Période Après-midi</th>
                  </tr>
                  <tr className='time'>
                    <th>08:00 - 09:00</th>
                    <th>09:00 - 10:00</th>
                    <th>10:00 - 11:00</th>
                    <th>11:00 - 12:00</th>
                    <th>14:00 - 15:00</th>
                    <th>15:00 - 16:00</th>
                    <th>16:00 - 17:00</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.length === 0 ? (
                    <tr key={-1}>
                      <td colSpan={11}>Le tableau est vide. Veuillez choisir la section.</td>
                    </tr>
                  ) : (
                    <>
                      {schedule.map((item, index) => (
                        <tr key={index}>
                          <td className='day'>{item.jour}</td>
                          <td>
                            <select className='selectTdd' value={item.subject1} onChange={(e) => handleSubjectChange(e, index, 'subject1')}>
                              {renderOptions(item.subject1)}
                            </select>
                          </td>
                          <td>
                            <select className='selectTdd' value={item.subject2} onChange={(e) => handleSubjectChange(e, index, 'subject2')}>
                              {renderOptions(item.subject2)}
                            </select>
                          </td>
                          <td>
                            <select className='selectTdd' value={item.subject3} onChange={(e) => handleSubjectChange(e, index, 'subject3')}>
                              {renderOptions(item.subject3)}
                            </select>
                          </td>
                          <td>
                            <select className='selectTdd' value={item.subject4} onChange={(e) => handleSubjectChange(e, index, 'subject4')}>
                              {renderOptions(item.subject4)}
                            </select>
                          </td>
                          <td>
                            <select className='selectTdd' value={item.subject5} onChange={(e) => handleSubjectChange(e, index, 'subject5')}>
                              {renderOptions(item.subject5)}
                            </select>
                          </td>
                          <td>
                            <select className='selectTdd' value={item.subject6} onChange={(e) => handleSubjectChange(e, index, 'subject6')}>
                              {renderOptions(item.subject6)}
                            </select>
                          </td>
                          <td>
                            <select className='selectTdd' value={item.subject7} onChange={(e) => handleSubjectChange(e, index, 'subject7')}>
                              {renderOptions(item.subject7)}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
              <div className='saveDiv'>
                <button className='save' onClick={handleSave}>Enregister</button>
              </div>
            </div>
          )}
        </div>
     
  );
};

export default Emploidetemps;
