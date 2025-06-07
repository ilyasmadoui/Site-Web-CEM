import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../newTp/PageParent.css'; 

function DemandesDeTransfert() {
    const [demandes, setDemandes] = useState([]);
    
    useEffect(() => {
        fetchDemandes();
      }, []);
    
    const fetchDemandes = () => {
        axios.post('http://localhost:5000/transfert_affich')
          .then(res => {
            setDemandes(res.data.demandes);
          })
          .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Demandes de Transfert</h1>
            <table className="demandes-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>École Précédente</th>
                        <th>École Actuelle</th>
                        <th>Raison du Transfert</th>
                    </tr>
                </thead>
                <tbody>
                    {demandes.map(demande => (
                        <tr key={demande.id}>
                            <td>{demande.id}</td>
                            <td>{demande.nom}</td>
                            <td>{demande.prenom}</td>
                            <td>{demande.ecolePrecedente}</td>
                            <td>{demande.ecoleActuelle}</td>
                            <td>{demande.raison}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DemandesDeTransfert;
