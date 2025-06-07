import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import StudentDetails from './StudentDetails'; 
import '../Design.css';

function ListEleve() {
  const [dataB, setData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [envoier, setEnvoier] = useState(false); 
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    id_parent:'',
    message:'',
  });

  const [Informations, setInformations] = useState({
    nomEleve: '',
    prenomEleve: '',
    nomPere: '',
    prenomPere: '',
    dateDeNaissance: '',
    reason: '',
    classe: '',
    type: ''
  });
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState('');

  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };
  const [level, setLevel] = useState('');
  const [section, setSection] = useState('');
  const [sections, setSections] = useState([]);


  const fetchDataSections = async () => {
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
  useEffect(() => {
    fetchDataSections();
  }, [level]);


  const optionsAnnee = ['1AM', '2AM', '3AM', '4AM'];
  const punishmentTypes = ['Avertissement', 'Rapport', 'Engagement', 'Conseil de discipline'];

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Liste');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleStudentClick = student => {
    setSelectedStudent(student);
  };

  const handleEnvoier = async (selectedStudent) => {
    setEnvoier(true);
    
    try {
      const response = await axios.get(`http://localhost:5000/parent/${selectedStudent.id_parent}`);
      setNotification({
        id_parent: selectedStudent.id_parent,
        message: '',
      });
      console.log(response.data);
      setInformations({
        nomEleve: selectedStudent.nom_francais,
        prenomEleve: selectedStudent.prenom_francais,
        nomPere: response.data[0].nomFr,
        prenomPere: response.data[0].prenomFr,
        dateDeNaissance: selectedStudent.date_naissance,
        reason: '',
        classe: selectedStudent.section,
        type: ''
      });
    } catch (error) {
      console.error('Error fetching parent data:', error);
    }
  };

  const showInput = () => {
    setShow(prevShow => !prevShow);
    setOtherReason(''); // Reset otherReason when hiding the textarea
  };

  const envoierFunction = async () => {
    const confirmed = window.confirm(`Confirmez-vous l'envoi du rapport de discpline ?`);
    if (confirmed) {
    const message = `
      Cher parent,

      Bonjour,

      Je tiens à vous informer que votre fils/votre fille ${Informations.nomEleve} ${Informations.prenomEleve} a reçu un ${Informations.type} en raison des comportements suivants observés à l'école :

      Raisons :
      ${selectedReasons.map(reason => `- ${reason}`).join('\n      ')}

      Nous apprécions votre coopération et votre soutien pour résoudre ces problèmes afin de garantir un environnement éducatif positif et approprié pour tous les élèves. Nous espérons que vous discuterez de ces comportements avec votre enfant et que vous travaillerez ensemble pour les corriger et éviter leur répétition à l'avenir.

      Pour toute question ou pour plus de détails, vous pouvez nous contacter par téléphone ou par e-mail.

      Avec nos salutations distinguées,
    `;
   
    console.log(notification+message);

    try {
      const response = await axios.post('http://localhost:5000/discipline', {
        message: message,
        id_parent: notification.id_parent
      });
      console.log('Data sent to server:', response.data);
      setEnvoier(false); // Reset form after successful submission
    } catch (error) {
      console.error('Error sending data to server:', error);
    }}
  };
  
  const handleTypeChange = (e) => {
    setInformations({ ...Informations, type: e.target.value });
  };

  const handleReasonChange = (reason, isChecked) => {
    if (reason === 'Autre') {
      setShow(isChecked); // Show/hide the textarea based on the "Autre" checkbox
      if (!isChecked) {
        setOtherReason(''); // Reset otherReason when hiding the textarea
      }
    } else {
      const updatedReasons = isChecked
        ? [...selectedReasons, reason]
        : selectedReasons.filter(item => item !== reason);
      setSelectedReasons(updatedReasons);
      setInformations({ ...Informations, reason: updatedReasons.join(', ') });
    }
  };

  const filteredData = dataB
  ? dataB.filter(
      item =>
        (level === '' || item.niveau === level) &&
        (section === '' || item.classe === section) &&
        (searchInput === '' ||
          item.nom_arabe.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.prenom_arabe.toLowerCase().includes(searchInput.toLowerCase()))
    )
  : [];

  return (
    <div className='rightContent'>
      {!envoier && (
        <>
          <h1>Liste des élèves :</h1>
          <div className='Fltr'>
            <div className='filtre'>
            <select className='select2' value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="">Choisir le niveau</option>
                <option value="1AM">1AM</option>
                <option value="2AM">2AM</option>
                <option value="3AM">3AM</option>
                <option value="4AM">4AM</option>
              </select>
              <select className='select2' value={section} onChange={(e) => setSection(e.target.value)}>
                <option value="">Choisir le section</option>
                {sections.map((item, index) => (
                  <option key={index} value={item.classes}>{item.classes}</option>
                ))}
              </select>
          </div>
          <input
            type='text'
            placeholder='Rechercher'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Classe</th>
                <th>
                Sexe</th>
            <th>Discipline</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id_eleve}>
              <td>{item.id_eleve}</td>
              <td>{item.nom_arabe}</td>
              <td>{item.prenom_arabe}</td>
              <td>{item.date_naissance}</td>
              <td>{item.section}</td>
              <td>{item.sexe}</td>
              <td>
                <button className='Envoier' onClick={() => handleEnvoier(item)}>Envoyer</button>
              </td>
              <td>
                <button onClick={() => handleStudentClick(item)}>Détails</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div className='modal-root'>
          <StudentDetails student={selectedStudent} onClose={handleCloseDetails} />
        </div>
      )}
    </>
  )}

  {envoier && (
    <div className='modalRoot'>
      <div className='allModel'>
        <h2>Informations sur discipline:</h2>
        <div className='info'>
          <div className='allInfo'>
            <p className="boldStyle"><b>Nom de l'élève: </b>{Informations.nomEleve}</p>
            <p className="boldStyle"><b>Prénom de l'élève: </b>{Informations.prenomEleve}</p>
            <p className="boldStyle"><b>Section: </b>{Informations.classe}</p>
          </div>
          <div className='allInfo'>
            <p className="boldStyle"><b>Nom du père: </b>{Informations.nomPere}</p>
            <p className="boldStyle"><b>Prénom du père: </b>{Informations.prenomPere}</p>
            <p className="boldStyle"><b>Date de naissance: </b>{Informations.dateDeNaissance}</p>
          </div>          
        </div>
        <div className='lab'>         
          <label className='type'>Type de discipline:</label>
          <select className='typeLab' value={Informations.type} onChange={handleTypeChange}>
            {punishmentTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className='lab'>         
          <label className='labRaison'>Raison:</label>
        </div>
        <div className='checkbox-container'>   
          <div className='inputInfo'>
            <input
              type="checkbox"
              id="chekbox1"
              name="chekbox1"
              value="Frapper un autre élève"
              onChange={e => handleReasonChange(e.target.value, e.target.checked)}
            />
            <label htmlFor="chekbox1">Frapper un autre élève</label><br/>
          </div>
          <div className='inputInfo'>
            <input
              type="checkbox"
              id="chekbox2"
              name="chekbox2"
              value="Obstruer le déroulement du cours"
              onChange={e => handleReasonChange(e.target.value, e.target.checked)}
            />
            <label htmlFor="chekbox2">Obstruer le déroulement du cours</label><br/>
          </div> 
          <div className='inputInfo'>
            <input
              type="checkbox"
              id="chekbox3"
              name="chekbox3"
              value="Comportements non éthiques et non éducatifs"
              onChange={e => handleReasonChange(e.target.value, e.target.checked)}
            />
            <label htmlFor="chekbox3">Comportements non éthiques et non éducatifs</label><br/>
          </div> 
          <div className='inputInfo'>
            <input
              type="checkbox"
              id="chekbox4"
              name="chekbox4"
              value="Ne pas apporter le matériel d'étude"
              onChange={e => handleReasonChange(e.target.value, e.target.checked)}
            />
            <label htmlFor="chekbox4">Ne pas apporter le matériel d'étude</label><br/>
          </div> 
          <div className='inputInfo'>
            <input
              type="checkbox"
              id="chekbox5"
              name="chekbox5"
              value="Ne pas prendre de notes ni faire les exercices"
              onChange={e => handleReasonChange(e.target.value, e.target.checked)}
            />
            <label htmlFor="chekbox5">Ne pas prendre de notes ni faire les exercices</label><br/>
          </div> 
          <div className='inputInfo'>
            <input
              type="checkbox"
              id="chekbox6"
              name="chekbox6"
              value="Ne pas réaliser les devoirs scolaires"
              onChange={e => handleReasonChange(e.target.value, e.target.checked)}
            />
            <label htmlFor="chekbox6">Ne pas réaliser les devoirs scolaires</label><br/>
          </div> 
          <div className='inputInfo'>
            <input
              type="checkbox"
              id="chekbox7"
              name="chekbox7"
              value="Autre"
              onChange={e => {
                handleReasonChange(e.target.value, e.target.checked);
                showInput();
              }}
            />
            <label htmlFor="chekbox7">Autre</label><br/>
            {show && (
              <textarea
                className='reason'
                style={{ resize: "none" }}
                type="text"
                name="chekbox7"
                id="chekbox7"
                value={otherReason}
                onChange={e => setOtherReason(e.target.value)}
              />
            )}
          </div> 
        </div>
        <div className='allBtn'>
          <button className='AnnulerBtn' onClick={() => setEnvoier(false)}>Annuler</button>
          <button className='EnvoierBtn' onClick={envoierFunction}>Envoyer</button>
        </div>
      </div>     
    </div>
  )}
</div>
  );
}

export default ListEleve;
