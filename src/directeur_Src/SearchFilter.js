// SearchFilter.jsx
import React from 'react';
import 'directeur.css'

const SearchFilter = ({ searchOption, handleSearchOptionChange, handleFilterChange }) => {
  return (
    <div>
      <label className='label_recherche'>🔎 Rechercher</label>
      <select className='select' value={searchOption} onChange={handleSearchOptionChange}>
        <option value="email">Email</option>
        <option value="nomFr">Nom-francais</option>
        <option value="prenomFr">Prenom-francais</option>
        <option value="poste">Poste</option>
        <option value="sexe">Sexe</option>
      </select>
      <input
        className='select2'
        type="text"
        placeholder='Rechercher'
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default SearchFilter;
