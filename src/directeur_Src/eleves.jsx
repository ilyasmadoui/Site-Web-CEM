import React, { useEffect, useState } from 'react';
import '../src_Adminstration/Design.css';
import image_director from './pic/dir4.png';
import bg from './pic/bg1.jpg';
import { Link } from "react-router-dom";
import axios from 'axios';

const fetchData = async (setEleve, setSearchType) => {
    try {
        const response = await axios.get('http://localhost:5000/Eleves');
        setEleve(response.data);
        setSearchType(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

function Eleves() {
    const [Eleves, setEleve] = useState(null);
    const [searchType, setSearchType] = useState([]);
    const [searchOption, setSearchOption] = useState("niveau");
    const [menuActive, setMenuActive] = useState(true);
    const [subMenuActive, setSubMenuActive] = useState(true);

    const toggleSubMenu = () => {
        setSubMenuActive(prevSubMenuActive => !prevSubMenuActive);
    };

    useEffect(() => {
        fetchData(setEleve, setSearchType);
    }, []);

    const [responseMessage, setResponseMessage] = useState('');

    const handleDelete = async (compte) => {
        console.log(compte);
        try {
            const response = await axios.delete('http://localhost:5000/Eleves/deleteRequest', { data: compte });
            setResponseMessage(response.data);
            alert("accepted" + compte.id);
            window.location.reload();
        } catch (error) {
            console.error('Error accepting request:', error);
            setResponseMessage('Error accepting request');
        }
    };

    const handleSearchOptionChange = (event) => {
        setSearchOption(event.target.value);
    };

    const handleFilterChange = (event) => {
        filter(event, searchOption);
    }

    const filter = (event, option) => {
        switch (option) {
            case "nomFr":
                setSearchType(Eleves.filter(f => f.nomFr && typeof f.nomFr === 'string' && f.nomFr.includes(event.target.value)));
                break;
            case "prenomFr":
                setSearchType(Eleves.filter(f => f.prenomFr && typeof f.prenomFr === 'string' && f.prenomFr.includes(event.target.value)));
                break;
            case "classe":
                setSearchType(Eleves.filter(f => f.classe && typeof f.classe === 'string' && f.classe.includes(event.target.value)));
                break;
            case "sexe":
                setSearchType(Eleves.filter(f => f.sexe && typeof f.sexe === 'string' && f.sexe.includes(event.target.value)));
                break;
            case "niveau":
                setSearchType(Eleves.filter(f => f.niveau && typeof f.niveau === 'string' && f.niveau.includes(event.target.value)));
                break;
            default:
                setSearchType(Eleves);
        }
    }

    return (
        <div>
            <div id="content">
                <h3>Les eleves</h3>
                <div className="sub-content3">
                    <label className='label_recherche'>🔎 Recharcher</label>
                    <select className='selectfR' value={searchOption} onChange={handleSearchOptionChange}>
                        <option value="nomFr">Nom-francais</option>
                        <option value="prenomFr">Prenom-francais</option>
                        <option value="sexe">sexe</option>
                        <option value="niveau">Niveau</option>
                        <option value="classe">Classe</option>
                    </select>
                    <input className='selectfr2'
                        type="text"
                        placeholder='Rechercher'
                        onChange={handleFilterChange}
                    />
                    <div className="tableau">
                    <table>
                        <thead className='odd'>
                            <tr>
                                <th className="thread">id</th>
                                <th className="thread">Nom en français</th>
                                <th className="thread">Nom en Arabe</th>
                                <th className="thread">Prénom en français</th>
                                <th className="thread">Prénom en Arabe</th>
                                <th className="thread">Sexe</th>
                                <th className="thread">Date de naissance</th>
                                <th className="thread">Wilaya</th>
                                <th className="thread">Niveau</th>
                                <th className="thread">Classe</th>
                                <th className="thread">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchType.map((result, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td className="thread">{result.id_eleve}</td>
                                    <td className="thread">{result.nom_francais}</td>
                                    <td className="thread">{result.nom_arabe}</td>
                                    <td className="thread">{result.prenom_arabe}</td>
                                    <td className="thread">{result.prenom_francais}</td>
                                    <td className="thread">{result.sexe}</td>
                                    <td className="thread">{result.date_naissance}</td>
                                    <td className="thread">{result.lieu_naissance}</td>
                                    <td className="thread">{result.niveau}</td>
                                    <td className="thread">{result.section}</td>
                                    <td className="thread"><button onClick={() => handleDelete(result)}>❌</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Eleves;
