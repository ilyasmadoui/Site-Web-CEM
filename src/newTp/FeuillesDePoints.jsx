import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeuillesDePoints = () => {
    const [eleves, setEleves] = useState([]);
    const [modulesParSemestre, setModulesParSemestre] = useState({});
    const [professeurs, setProfesseurs] = useState([]);
    const [notesDevoirs, setNotesDevoirs] = useState({});
    const [selectedEleveId, setSelectedEleveId] = useState(null);

    useEffect(() => {
        fetchEleves();
    }, []);

    const fetchEleves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/affich_eleves_Parent_conform');
            if (response.data && response.data.eleves) {
                setEleves(response.data.eleves);
                if (response.data.eleves.length > 0) {
                    fetchModules(response.data.eleves[0].id_eleve);
                }
            } else {
                console.error('Erreur: Aucune donnée d\'élève trouvée dans la réponse.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des élèves:', error);
        }
    };

    const fetchProfesseurs = async (id_eleve) => {
        try {
            const response = await axios.get(`http://localhost:5000/getAllProfessorsByClass/${id_eleve}`);
            setProfesseurs(response.data.professeurs);
        } catch (error) {
            console.error('Erreur lors de la récupération des professeurs:', error);
        }
    };

    const fetchModules = async (id_eleve) => {
        try {
            const response = await axios.get(`http://localhost:5000/affich_modules/${id_eleve}`);
            setModulesParSemestre(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des modules:', error);
        }
    };

    const fetchNotes = async (id_eleve, module, semestre) => {
        try {
            const response = await axios.get('http://localhost:5000/notes', {
                params: { id_eleve, module, semestre }
            });
            return response.data[0];
        } catch (error) {
            console.error(`Erreur lors de la récupération des notes pour l'élève ${id_eleve}, le module ${module} et le semestre ${semestre}:`, error);
            return null;
        }
    };

    const handleChangeOperation = async (eleveId, value) => {
        const updatedEleves = eleves.map(eleve =>
            eleve.id_eleve === eleveId ? { ...eleve, Opérations: value } : eleve
        );

        setEleves(updatedEleves);

        if (value) {
            const modules = modulesParSemestre[value];
            const notes = await Promise.all(modules.map(module =>
                fetchNotes(eleveId, module.module, value)
            ));
            fetchProfesseurs(eleveId);

            setNotesDevoirs(prevNotes => ({
                ...prevNotes,
                [eleveId]: notes.reduce((acc, note, index) => {
                    if (note) {
                        acc[modules[index].module] = note;
                    }
                    return acc;
                }, {})
            }));
        }
    };

    const calculateAverage = (interro1, interro2, control) => {
        const total = interro1 + interro2 + control * 2;
        return (total / 4).toFixed(2);
    };

    const calculateFinalAverage = (notes) => {
        const moduleAverages = Object.values(notes).map(note => {
            if (note) {
                return parseFloat(calculateAverage(note.interro1, note.interro2, note.control));
            } else {
                return 0;
            }
        });

        const sumOfAverages = moduleAverages.reduce((acc, avg) => acc + avg, 0);
        return (sumOfAverages / moduleAverages.length).toFixed(2);
    };

    return (
        <div>
            <h1>*Les résultats de mes enfants*</h1>
            <table>
                <thead>
                    <tr>
                        <th>id de parent</th>
                        <th>id d'eleve</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Opération</th>
                    </tr>
                </thead>
                <tbody>
                    {eleves.length === 0 ? (
                        <tr>
                            <td colSpan="5">Aucun élève trouvé</td>
                        </tr>
                    ) : (
                        eleves.map((eleve, index) => (
                            <tr key={index}>
                                <td>{eleve.id_parent}</td>
                                <td>{eleve.id_eleve}</td>
                                <td>{eleve.nom}</td>
                                <td>{eleve.prenom}</td>
                                <td>
                                    <select className="operation-select" value={eleve.Opérations || ''} onChange={(e) => handleChangeOperation(eleve.id_eleve, e.target.value)}>
                                        <option value="">Sélectionnez une opération</option>
                                        {Object.keys(modulesParSemestre).map(semestre => (
                                            <option key={semestre} value={semestre}>{semestre}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {eleves.map(eleve => (
                <div key={eleve.id_eleve}>
                    {eleve.Opérations && modulesParSemestre[eleve.Opérations] && (
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="9">Résultats de "{eleve.nom} {eleve.prenom}" ({eleve.Opérations})</th>
                                </tr>
                                <tr>
                                    <th>id d'eleve</th>
                                    <th>Module</th>
                                    <th>Nom Prof</th>
                                    <th>Prénom Prof</th>
                                    <th>Email</th>
                                    <th>Interro1</th>
                                    <th>Interro2</th>
                                    <th>Contrôle</th>
                                    <th>Moyenne</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modulesParSemestre[eleve.Opérations].map(module => {
                                    const prof = professeurs.find(prof => prof.matiere === module.module) || {};
                                    const notes = notesDevoirs[eleve.id_eleve]?.[module.module] || {};

                                    return (
                                        <tr key={module.module}>
                                            <td>{eleve.id_eleve}</td>
                                            <td>{module.module}</td>
                                            <td>{prof.nom_francais || ''}</td>
                                            <td>{prof.prenom_francais || ''}</td>
                                            <td>{prof.email || ''}</td>
                                            <td>{notes.interro1 || ''}</td>
                                            <td>{notes.interro2 || ''}</td>
                                            <td>{notes.control || ''}</td>
                                            <td>{notes.interro1 !== undefined && notes.interro2 !== undefined && notes.control !== undefined
                                                ? calculateAverage(notes.interro1, notes.interro2, notes.control)
                                                : ''}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <th colSpan="5" style={{ textAlign: 'center', fontWeight: 'bold' }}>Moyenne générale</th>
                                    <td colSpan="4" style={{ backgroundColor: '#17a2b8', textAlign: 'center' }}>{calculateFinalAverage(notesDevoirs[eleve.id_eleve] || {})}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FeuillesDePoints;