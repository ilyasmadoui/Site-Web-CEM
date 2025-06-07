import React, { useEffect, useState } from 'react';
import './directeur.css';
import image_director from './pic/dir4.png';
import { Link } from "react-router-dom"
import axios from 'axios';

const fetchData = async (
  setComptes,
  setSearchType,
  setEns,
  setSearchTypeEns,
  setParent,
  setSearchTypeParent
) => {
  try {
    const response = await axios.get('http://localhost:5000/demandes');
    const data = Array.isArray(response.data.result) ? response.data.result : []; // Ensure data is an array
    console.log("Data:", data);

    // Filter data based on roles
    const adminAccounts = data.filter(item => item.role === 1);
    const parentAccounts = data.filter(item => item.role === 3);
    const EnsigAccounts = data.filter(item => item.role === 2);

    // Update state using provided functions
    setComptes(adminAccounts);
    setSearchType(adminAccounts);
    setEns(EnsigAccounts);
    setSearchTypeEns(EnsigAccounts);
    setParent(parentAccounts);
    setSearchTypeParent(parentAccounts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function ListeDemandes() {
  const [comptes, setComptes] = useState([]);
  const [ens, setEns] = useState([]);
  const [parent, setParent] = useState([]);
  const [searchType, setSearchType] = useState([]);
  const [searchTypeEns, setSearchTypeEns] = useState([]);
  const [searchTypeParent, setSearchTypeParent] = useState([]);
  const [searchOption, setSearchOption] = useState("poste"); 
  const [menuActive, setMenuActive] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(true);
  const [buttonClicked1, setButtonClicked1] = useState(false);
  const [buttonClicked2, setButtonClicked2] = useState(false);
  const [subContentActive, setSubContentActive] = useState('sub-content table1');

  useEffect(() => {
    fetchData(setComptes, setSearchType, setEns, setSearchTypeEns, setParent, setSearchTypeParent);
  }, []);

  const handleFilterChange = (event) => {
    filter(event, searchOption);
  };

  const handleFilterChangeEns = (event) => {
    filterEns(event, searchOption);
  };

  const handleFilterChangeParent = (event) => {
    filterParent(event, searchOption);
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const filter = (event, option) => {
    const value = event.target.value.toLowerCase();
    setSearchType(comptes.filter(item => item[option] && item[option].toLowerCase().includes(value)));
  };

  const filterEns = (event, option) => {
    const value = event.target.value.toLowerCase();
    setSearchTypeEns(ens.filter(item => item[option] && item[option].toLowerCase().includes(value)));
    
  };

  const filterParent = (event, option) => {
    const value = event.target.value.toLowerCase();
    setSearchTypeParent(parent.filter(item => item[option] && item[option].toLowerCase().includes(value)));
  };

  const handleButtonClick = (buttonNumber) => {
    setButtonClicked(buttonNumber === 1);
    setButtonClicked1(buttonNumber === 2);
    setButtonClicked2(buttonNumber === 3);

    if (buttonNumber === 1) {
      setSubContentActive('sub-content table1');
    } else if (buttonNumber === 2) {
      setSubContentActive('sub-content1 table2');
    } else if (buttonNumber === 3) {
      setSubContentActive('sub-content2 table3');
    }
  };

  const [responseMessage, setResponseMessage] = useState('');

  const handleAccept = async (compte) => {
    try {
      const response = await axios.put('http://localhost:5000/demandes/acceptRequest', compte);
      setResponseMessage(response.data);
      alert("Accepté");
      window.location.reload();
    } catch (error) {
      console.error('Error accepting request:', error);
      setResponseMessage('Error accepting request');
    }
  };

  const handleReject = async (compte) => {
    try {
      const response = await axios.delete('http://localhost:5000/demandes/rejectRequest', { data: compte });
      setResponseMessage(response.data);
      alert("rejecté");
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting request:', error);
      setResponseMessage('Error rejecting request');
    }
  };

  return (
    <div id="h11" className={menuActive ? 'menu-active' : ''}>
      <h1>Gestion des demandes</h1>

      <div id="content" className={menuActive ? 'menu-active' : ''}>
        <div className='Cont'>
          <button 
            id='btn' 
            className={menuActive ? 'menu-active' : ''} 
            style={{ backgroundColor: buttonClicked ? /*'#8d3481ce'*/ ' #929292' : /*'#8d3481ce'*/ '#ddd', height: buttonClicked ? '50px' : '30px' }}
            onClick={() => handleButtonClick(1)}>
            Administration
          </button>
          <button 
            id='btn' 
            className={menuActive ? 'menu-active' : ''} 
            style={{ backgroundColor: buttonClicked1 ? ' #929292' : /*'#8d3481ce'*/ '#ddd', height: buttonClicked1 ? '50px' : '30px' }}
            onClick={() => handleButtonClick(2)}>
            Enseignant
          </button>
          <button 
            id='btn' 
            className={menuActive ? 'menu-active' : ''} 
            style={{ backgroundColor: buttonClicked2 ? ' #929292' : /*'#8d3481ce'*/ '#ddd', height: buttonClicked2 ? '50px' : '30px' }}
            onClick={() => handleButtonClick(3)}>
            Parent
          </button>
        </div>
        <div className="table-container">
          {subContentActive === 'sub-content table1' && (
            comptes && (
              <div>
                <label className='label_recherche'>🔎 Rechercher </label>
                <select className='select' value={searchOption} onChange={handleSearchOptionChange}>
                <option value="poste">Poste</option>
                  <option value="nomAr">Nom-arabe</option>
                  <option value="prenomAr">Prénom-arabe</option>
                  <option value="sexe">Sexe</option>
                </select>
                {searchType && (
                  <input className='select2'
                    type="text"
                    placeholder='Rechercher'
                    onChange={handleFilterChange}
                  />
                )}
                <div>
                  <table className="table">
                    <thead className='odd'>
                      <tr>
                        <th className="thread">Identifiant</th>
                        {/*<th className="thread">Numéro de tel</th>*/}
                        {/*<th className="thread">Nom en français</th>*/}
                        <th className="thread">Nom en Arabe</th>
                        {/*<th className="thread">Prénom en français</th>*/}
                        <th className="thread">Prénom en Arabe</th>
                        <th className="thread">Sexe</th>
                        <th className="thread">Date de naissance</th>
                       {/* <th className="thread">Numéro d'identification</th>*/}
                        {/*<th className="thread">Wilaya</th>*/}
                        <th className="thread">Poste</th>
                        <th className="thread">Accepter</th>
                        <th className="thread">Rejecter</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchType.map((compte, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                          <td>{compte.id}</td>
                          {/*<td>{compte.telph}</td>*/}
                          {/*<td>{compte.nomFr}</td>*/}
                          <td>{compte.nomAr}</td>
                          {/*<td>{compte.prenomFr}</td>*/}
                          <td>{compte.prenomAr}</td>
                          <td>{compte.sex}</td>
                          <td>{compte.dateN}</td>
                          {/*<td>{compte.idProfessionnelle}</td>*/}
                          {/*<td>{compte.Wilaya}</td>*/}
                          <td>{compte.poste}</td>
                          <td>
                            <button onClick={() => handleAccept(compte)} className='accept-btn'>✔️</button>
                            </td><td><button onClick={() => handleReject(compte)} className='reject-btn'>❌</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
          {subContentActive === 'sub-content1 table2' && (
            ens && (
              <div>
                <label className='label_recherche'>🔎 Rechercher </label>
                <select className='select' value={searchOption} onChange={handleSearchOptionChange}>
                  <option value="poste">Poste</option>
                  <option value="nomAr">Nom-arabe</option>
                  <option value="prenomAr">Prénom-arabe</option>
                  {/*<option value="sexe">Sexe</option>*/}
                </select>
                {searchTypeEns && (
                  <input className='select2'
                    type="text"
                    placeholder='Rechercher'
                    onChange={handleFilterChangeEns}
                  />
                )}
                <div>
                  <table className="table">
                    <thead className='odd'>
                      <tr>
                        <th className="thread">Identifiant</th>
                        <th className="thread">Numéro de tel</th>
                        {/*<th className="thread">Nom en français</th>*/}
                        <th className="thread">Nom en Arabe</th>
                        {/*<th className="thread">Prénom en français</th>*/}
                        <th className="thread">Prénom en Arabe</th>
                        <th className="thread">Sexe</th>
                        <th className="thread">Date de naissance</th>
                        {/*<th className="thread">Numéro d'identification</th>
                        <th className="thread">Wilaya</th>*/}
                        <th className="thread">Spécialité</th>
                        <th className="thread">Accepter</th>
                        <th className="thread">Rejecter</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchTypeEns.map((compte, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                          <td>{compte.id}</td>
                          <td>{compte.telph}</td>
                          {/*<td>{compte.nomFr}</td>*/}
                          <td>{compte.nomAr}</td>
                         {/* <td>{compte.prenomFr}</td>*/}
                          <td>{compte.prenomAr}</td>
                          <td>{compte.sex}</td>
                          <td>{compte.dateN}</td>
                          {/*<td>{compte.idProfessionnelle}</td>*/}
                          {/*<td>{compte.Wilaya}</td>*/}
                          <td>{compte.poste}</td>
                          <td>
                            <button onClick={() => handleAccept(compte)} className='accept-btn'>✔️</button>
                            </td><td><button onClick={() => handleReject(compte)} className='reject-btn'>❌</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
          {subContentActive === 'sub-content2 table3' && (
            parent && (
              <div>
                <label className='label_recherche'>🔎 Rechercher </label>
                <select className='select' value={searchOption} onChange={handleSearchOptionChange}>
                {/*<option value="Wilaya">Wilaya</option>*/}
                  <option value="nomAr">Nom-arabe</option>
                  <option value="prenomAr">Prénom-arabe</option>
                  {/*<option value="sexe">Sexe</option>*/}
                </select>
                {searchTypeParent && (
                  <input className='select2'
                    type="text"
                    placeholder='Rechercher'
                    onChange={handleFilterChangeParent}
                  />
                )}
                <div>
                  <table className="table">
                    <thead className='odd'>
                      <tr>
                        <th className="thread">Identifiant</th>
                        <th className="thread">Numéro de tel</th>
                        {/*<th className="thread">Nom en français</th>*/}
                        <th className="thread">Nom en Arabe</th>
                        {/*<th className="thread">Prénom en français</th>*/}
                        <th className="thread">Prénom en Arabe</th>
                        <th className="thread">Sexe</th>
                        <th className="thread">Date de naissance</th>
                        {/*<th className="thread">Numéro d'identification</th>*/}
                        <th className="thread">Wilaya</th>
                        <th className="thread">Accepter</th>
                        <th className="thread">Rejecter</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchTypeParent.map((compte, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                          <td>{compte.id}</td>
                          <td>{compte.telph}</td>
                         {/* <td>{compte.nomFr}</td>*/}
                          <td>{compte.nomAr}</td>
                          {/*<td>{compte.prenomFr}</td>*/}
                          <td>{compte.prenomAr}</td>
                          <td>{compte.sex}</td>
                          <td>{compte.dateN}</td>
                          {/*<td>{compte.idProfessionnelle}</td>*/}
                          <td>{compte.Wilaya}</td>
                          <td>
                            <button onClick={() => handleAccept(compte)} className='accept-btn'>✔️</button>
                            </td><td> <button onClick={() => handleReject(compte)} className='reject-btn'>❌</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ListeDemandes;
