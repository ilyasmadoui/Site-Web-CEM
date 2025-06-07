import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AllForms from './newTp/AllForms';
import Parent from './classes/Parent';
import Enseignant from './classes/Enseignant';
import Login from './classes/Login';
import DirecteurFirstPage from './directeur_Src/first-page';
import ListeDemandes from './directeur_Src/liste_des_demmandes'; 
import ListeComptes from './directeur_Src/listes_des_comptes'; 
import Eleves from './directeur_Src/eleves';
import Eleve from './directeur_Src/ajouterEleve';
import Stat from './directeur_Src/statistique';
import VoirAnnonces from'./directeur_Src/VoirAnnonces';
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
import MonProfilDer from './directeur_Src/profilDirecteur';
import PageParent from './newTp/PageParent';
import PageEnseignat from './newTp/PageEnseignat';
import EleveEnseignat from './newTp/EleveEnseignat';
import PointEleves from './newTp/PointEleves';
import EmailParent from './newTp/EmailParent';
import Messenger from './newTp/Messenger';
import GestionAnnonces1 from './newTp/GestionAnnonces1';
import EleveParent from './newTp/EleveParent';
import FeuillesDePoints from './newTp/FeuillesDePoints';
import AbsencesDesEnfants from './newTp/AbsencesDesEnfants';
import DemandesDeTransfert from './newTp/DemandesDeTransfert';
import Emploidetemp from './newTp/Emploidetemp';
import ConformerEleves from './newTp/ConformerEleves';
import Main from './src_Adminstration/classes/Main';
import GestionNotification from './src_Adminstration/classes/gestionNotification';
import Main1 from './newTp/Main1';
import Main3 from './newTp/Main3';

import Main2 from './src_Adminstration/classes/Main2';
import ListeDeseleves2 from './src_Adminstration/classes/ListeDeseleves2';





const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/AllForms" component={AllForms} />
      <Route exact path="/Parent" component={Parent} />
      <Route exact path="/Enseignant" component={Enseignant} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/Administration" component={Administration} />
      <Route exact path="/DirecteurProfile" component={Directeur} />
      <Route exact path="/PageEnseignat" component={PageEnseignat} />
      <Route exact path="/PageParent" component={PageParent} />
      <Route exact path="/Accueil" component={Main1} />
  

    <Route path="/PageEnseignat">
    <PageEnseignat>
        <Switch>
          {/*<Route exact path="/PageEnseignat/Main3" component={Main3}/>*/}
          <Route exact path="/PageEnseignat/MonProfil" component={MonProfil} />
          <Route exact path="/PageEnseignat/EleveEnseignat" component={EleveEnseignat} />
          <Route exact path="/PageEnseignat/PointEleves" component={PointEleves}/>
          <Route exact path="/PageEnseignat/EmailParent" component={EmailParent}/>
          <Route exact path="/PageEnseignat/Messenger" component={Messenger}/>
          <Route eaxct path="/PageEnseignat/GestionAnnonces1" component={GestionAnnonces1}/>
        </Switch>
    </PageEnseignat>
    </Route>

    
    <Route path="/PageParent">
    <PageParent>
        <Switch>
          {/*<Route exact path="/PageParent/Main1" component={Main1}/>*/}
          <Route exact path="/PageParent/MonProfil" component={MonProfil} />
          <Route exact path="/PageParent/EleveParent" component={EleveParent} />
          <Route exact path="/PageParent/FeuillesDePoints" component={FeuillesDePoints}/>
          <Route exact path="/PageParent/AbsencesDesEnfants" component={AbsencesDesEnfants}/>
          <Route exact path="/PageParent/DemandesDeTransfert" component={DemandesDeTransfert}/>
          <Route exact path="/PageParent/Messenger" component={Messenger}/>
          <Route exact path="/PageParent/GestionAnnonces1" component={GestionAnnonces1}/>
          <Route exact path="/PageParent/Emploidetemp" component={Emploidetemp}/>
        </Switch>
    </PageParent>
    </Route>


      <Route path="/Administration">
        <Administration>
          <Switch>
{/*            <Route exact path="/Administration/Accueil" component={Main}/>*/}    
        <Route exact path="/Administration/gestionDesClasses" component={Gclasses} />
            <Route exact path="/Administration/Liste" component={ComptAdm} /> 
            <Route exact path="/Administration/ListeDeseleves2" component={ListeDeseleves2} /> 
            <Route exact path="/Administration/gestionAbsence" component={Absence} />
            <Route exact path="/Administration/annonces" component={Annonce} />
            <Route exact path="/Administration/ConformerEleves" component={ConformerEleves} />
            <Route exact path="/Administration/gestionAnnonces" component={GestionAnnonce} />
            <Route exact path="/Administration/emploisDeTemps" component={Emploi} />
            <Route exact path="/Administration/GestionNotification" component={GestionNotification} />
            <Route exact path="/Administration/GestionNotification" component={GestionNotification} />
            <Route exact path="/Administration/listClasses" component={ListesClasses} />
            <Route exact path="/Administration/listDesEleves" component={ListesEleves} />
            <Route exact path="/Administration/listDesEnsigiants" component={ListesEnsg} />
            <Route exact path="/Administration/MonProfil" component={MonProfil} />
          </Switch>
        </Administration>
      </Route>
 
      <Route path="/DirecteurProfile">
        <Directeur>
          <Switch>
            {/*<Route exact path="/DirecteurProfile/Main2" component={Main2}/>*/}
            <Route exact path="/DirecteurProfile/eleves" component={Eleves} />

            <Route exact path="/DirecteurProfile/Directeur" component={DirecteurFirstPage} />
            <Route exact path="/DirecteurProfile/demandes" component={ListeDemandes} /> 
            <Route exact path="/DirecteurProfile/comptes" component={ListeComptes} /> 
            <Route exact path="/DirecteurProfile/stat" component={Stat} />
            <Route exact path="/DirecteurProfile/addEleve" component={Eleve} />
            <Route exact path="/DirecteurProfile/gestionAnnonces" component={GestionAnnonce} />
            <Route exact path="/DirecteurProfile/ConformerEleves" component={ConformerEleves} />
            <Route exact path="/DirecteurProfile/emploisDeTemps" component={Emploi} />
            <Route exact path="/DirecteurProfile/listClasses" component={ListesClasses} />
            <Route exact path="/DirecteurProfile/listDesEleves" component={ListesEleves} />
            <Route exact path="/DirecteurProfile/listDesEnsigiants" component={ListesEnsg} />
            <Route exact path="/DirecteurProfile/MonProfil" component={MonProfilDer} />
            <Route exact path="/DirecteurProfile/VoirAnnonces" component={VoirAnnonces} />
          </Switch>
        </Directeur>
      </Route>
    </Switch>
  </Router>,
  rootElement
);
/*<Route exact path="/Main" component={Main}>*/
reportWebVitals();
