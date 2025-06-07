import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './test';
import reportWebVitals from './reportWebVitals';
import AllForms from './newTp/AllForms';
import Parent from './classes/Parent';
import Enseignant from './classes/Enseignant';
import Suivant from './classes/Suivant';
import Login from './classes/Login';
import DirecteurFirstPage from './directeur_Src/first-page';
import ListeDemandes from './directeur_Src/liste_des_demmandes'; 
import ListeComptes from './directeur_Src/listes_des_comptes'; 
import Eleves from './directeur_Src/eleves';
import Eleve from './directeur_Src/ajouterEleve';
import Stat from './directeur_Src/statistique';
import Emploi from './src_Adminstration/classes/Emploidetemp';
import Gclasses from './src_Adminstration/classes/gestionDesclasses'
import ComptAdm from './src_Adminstration/classes/comptAdm';
import Absence from './src_Adminstration/classes/gestionDabsence';
import GestionAnnonce from './src_Adminstration/classes/GestionAnnonces';
import Annonce from './src_Adminstration/classes/annonces';
import ListesClasses from './src_Adminstration/classes/listedesClasses';
import ListesEleves from './src_Adminstration/classes/listeDesElves';
import ListesEnsg from './src_Adminstration/classes/listeDesEnsigiants';
import Administration from './src_Adminstration/classes/pageAdministration';
import Directeur from './directeur_Src/pageDirecteur';

import MonProfil from './src_Adminstration/classes/profilAdministration';

function DirecteurP() {

  <Router>
  <Switch>
    
    <Route path="/DirecteurProfile" component={Directeur}/>
    <Route>

      <Directeur>
     <Route path="/Directeur" component={DirecteurFirstPage} />
    <Route path="/demandes" component={ListeDemandes} /> 
    <Route path="/comptes" component={ListeComptes} /> 
    <Route path="/stat" component={Stat}/>
    <Route path="/addEleve" component={Eleve}/>
    <Route path="/gestionAnnonces" component={GestionAnnonce}/>
    <Route path="/emploisDeTemps" component={Emploi}/>
    <Route path="/listClasses" component={ListesClasses}/>
    <Route path="/listDesEleves" component={ListesEleves}/>
    <Route path="/listDesEnsigiants" component={ListesEnsg}/>
    <Route path="/MonProfil" component={MonProfil}/>

      </Directeur>
    </Route>
  </Switch>
</Router>

};

reportWebVitals();



export default DirecteurP;
