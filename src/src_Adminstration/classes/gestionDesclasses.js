import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"; // Import useHistory
import '../Design.css';
import Header from './Header';
import Liste from './listeleve';
import { Link } from "react-router-dom";
import Table from "../pic/timetable.png"
import Table2 from "../pic/edit.png"
import back from "../pic/back.png"
import tabl3 from "../pic/customer.png"

const Emploidetemps = () => {
  const [level, setLevel] = useState('');
  const [section, setSection] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [emploiAffichage, setEmploiAffichage] = useState(false);
  const [emploiModifie, setEmploiModifie] = useState(false);
  const history = useHistory(); // Initialize useHistory

  // Your other functions here

  return (
    
        <div className='rightContent'>
          <div className='actions'>
            <div className='actions'>
              <div className='buttonGroup'>
                <button className='BtnTable' onClick={() => {history.push('/emploisDeTemps')}}>Les emplois de temps
                  <img className='imgTable' srcSet={Table} alt="Table"></img>
                </button>
                <button className='BtnTable' onClick={() => history.push('/listClasses')}>Listes des classes
                  <img className='imgTable' srcSet={Table2} alt="Table2"></img>
                </button>
              </div>
              <div className='buttonGroup'>
                <button className='BtnTable' onClick={() => history.push('/listDesEnsigiants')}>Liste des Enseignant
                  <img className='imgTable' srcSet={tabl3} alt="Table"></img>
                </button>
                <button className='BtnTable' onClick={() => history.push('/listDesEleves')}>Liste des élèves
                  <img className='imgTable' srcSet={tabl3} alt="Table2"></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      
  );
};

export default Emploidetemps;
