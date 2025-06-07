import React, { useEffect, useState } from 'react';
import './directeur.css';
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
    const response = await axios.get('http://localhost:5000/comptes');
    const data = Array.isArray(response.data.result) ? response.data.result : [];
    console.log("Data:", data);
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

const TableComponent = ({ data, searchType, handleFilterChange, searchOption, handleSearchOptionChange }) => (
  <div className='table-container'>
     <label className='label_recherche'>🔎 Rechercher </label>
            <select className='select' value={searchOption} onChange={handleSearchOptionChange}>
              <option value="id">Identifiant</option>
              <option value="nomAr">Nom-arabe</option>
              <option value="prenomAr">Prenom-arabe</option>
              <option value="poste">Poste</option>
              <option value="sexe">Sexe</option>
            </select>
            <input className='select2' type="text" placeholder='Rechercher' onChange={handleFilterChange} />
          
    <table className='table'>
      
      <thead className='odd'>
        
        <tr>
          <th className="thread">Identifiant</th>
          {/*<th className="thread">Numéro de tel</th>
          <th className="thread">Nom en français</th>*/}
          <th className="thread">Nom en Arabe</th>
          {/*<th className="thread">Prénom en français</th>*/}
          <th className="thread">Prénom en Arabe</th>
          <th className="thread">Sexe</th>
          <th className="thread">Date de naissance</th>
          {/*<th className="thread">Numéro d'identification</th>
          <th className="thread">Wilaya</th>*/}
          <th className="thread">Poste</th>
        </tr>
      </thead>
      <tbody>
        {searchType && searchType.map((result, index) => (
          <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
            <td className="thread">{result.id}</td>
            {/*<td className="thread">{result.telph}</td>
            <td className="thread">{result.nomFr}</td>*/}
            <td className="thread">{result.nomAr}</td>
           {/*<td className="thread">{result.prenomFr}</td>*/}
            <td className="thread">{result.prenomAr}</td>
            <td className="thread">{result.sex}</td>
            <td className="thread">{result.dateN}</td>
            {/*<td className="thread">{result.idProfessionnelle}</td>
            <td className="thread">{result.Wilaya}</td>*/}
             {result.role ===2 ? (
              <td className="thread">Enseginant de {result.poste}</td>
             ):(
              <td className="thread">{result.poste}</td>

             )}
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

function ListeComptes() {
  const [comptes, setComptes] = useState([]);
  const [ens, setEns] = useState([]);
  const [parent, setParent] = useState([]);
  const [searchType, setSearchType] = useState([]);
  const [searchTypeEns, setSearchTypeEns] = useState([]);
  const [searchTypeParent, setSearchTypeParent] = useState([]);
  const [searchOption, setSearchOption] = useState("id");
  const [activeSection, setActiveSection] = useState('admin');

  useEffect(() => {
    fetchData(setComptes, setSearchType, setEns, setSearchTypeEns, setParent, setSearchTypeParent);
  }, []);

  const handleFilterChange = (event) => {
    const filterData = (data) => {
      switch (searchOption) {
        case "id":
          return data.filter(f => f.id && f.id.toString().includes(event.target.value));
          case "nomAr":
          return data.filter(f => f.nomAr && f.nomAr.includes(event.target.value));
        case "prenomAr":
          return data.filter(f => f.prenomAr && f.prenomAr.includes(event.target.value));
        case "poste":
          return data.filter(f => f.poste && f.poste.includes(event.target.value));
        case "sexe":
          return data.filter(f => f.sex && f.sex.includes(event.target.value));
        default:
          return data;
      }
    };

    switch (activeSection) {
      case 'admin':
        setSearchType(filterData(comptes));
        break;
      case 'ens':
        setSearchTypeEns(filterData(ens));
        break;
      case 'parent':
        setSearchTypeParent(filterData(parent));
        break;
      default:
        break;
    }
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  return (
    <div id="h11">
    <div id="content">
            <h1>Gestion des comptes</h1>

      <div className='Cont'>
        <button
          id='btn'
          style={{ backgroundColor: activeSection === 'admin' ? ' #929292' : '#ddd', height: activeSection === 'admin' ? '50px' : '30px' }}
          onClick={() => setActiveSection('admin')}>
          Administration
        </button>
        <button
          id='btn'
          style={{ backgroundColor: activeSection === 'parent' ? ' #929292' : '#ddd', height: activeSection === 'parent' ? '50px' : '30px' }}
          onClick={() => setActiveSection('parent')}>
          Parent
        </button>
        <button
          id='btn'
          style={{ backgroundColor: activeSection === 'ens' ? ' #929292' : '#ddd', height: activeSection === 'ens' ? '50px' : '30px' }}
          onClick={() => setActiveSection('ens')}>
          Enseignant
        </button>
      </div>

      {activeSection === 'admin' && (
        <TableComponent
          data={comptes}
          searchType={searchType}
          handleFilterChange={handleFilterChange}
          searchOption={searchOption}
          handleSearchOptionChange={handleSearchOptionChange}
        />
      )}
      {activeSection === 'ens' && (
        <TableComponent
          data={ens}
          searchType={searchTypeEns}
          handleFilterChange={handleFilterChange}
          searchOption={searchOption}
          handleSearchOptionChange={handleSearchOptionChange}
        />
      )}
      {activeSection === 'parent' && (
        <TableComponent
          data={parent}
          searchType={searchTypeParent}
          handleFilterChange={handleFilterChange}
          searchOption={searchOption}
          handleSearchOptionChange={handleSearchOptionChange}
        />
      )}
    </div>
    </div>
  );
}

export default ListeComptes;
