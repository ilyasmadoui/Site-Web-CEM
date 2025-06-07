import React, { useState, useEffect } from 'react';
import '../Design.css';
import axios from 'axios';
import Modal from 'react-modal';

const GestionAnnonces = () => {
  const [ajouterAnnonce, setAjouterAnnonce] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: '',
    text: '',
    date: new Date().toLocaleDateString('fr-CA'),
    imageUrl: '',
  });
  const [editNotificationData, setEditNotificationData] = useState({});
  const [selectedNotificationIndex, setSelectedNotificationIndex] = useState(null);
  const [largeImageModalOpen, setLargeImageModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedNotification, setEditedNotification] = useState({});

  const fetchDataSelect = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAnonnce');
      setNotifications(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataSelect();
  }, []);

  useEffect(() => {
    setFilteredNotifications(
      notifications.filter(notification =>
        notification.titre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, notifications]);

  const handleAddNotification = async () => {
    const confirmed = window.confirm(`Confirmez-vous l'ajout de l'annonce ?`);
    if (confirmed) {
      try {
        const formData = new FormData();
        formData.append('title', newNotification.title);
        formData.append('date', newNotification.date);
        formData.append('text', newNotification.text);
        formData.append('image', newNotification.imageUrl);

        await axios.put('http://localhost:5000/putAnonnce', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setNewNotification({
          title: '',
          text: '',
          date: new Date().toLocaleDateString('fr-CA'),
          imageUrl: '',
        });
        setAjouterAnnonce(false);
        fetchDataSelect();

      } catch (error) {
        console.error('Error adding notification:', error);
      }
    }
  };

  const handleEditNotification = (notification, index) => {
    setSelectedNotificationIndex(index);
    setEditNotificationData(notification);
    openEditModal(notification);
  };

  const handleSaveEdit = async () => {
    try {
      const confirmed = window.confirm(`Confirmez-vous la modification de l'annonce ?`);
      if (confirmed) {
        if (editedNotification.titre.trim() !== '' && editedNotification.contenu.trim() !== '') {
          const formData = new FormData();
          formData.append('id', editedNotification.id);
          formData.append('titre', editedNotification.titre);
          formData.append('contenu', editedNotification.contenu);
          formData.append('imageUrl', editedNotification.imageUrl || '');
          formData.append('image', editedNotification.image || '');

          await axios.put('http://localhost:5000/editAnnonce', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          closeEditModal();
          fetchDataSelect();
        }
      }
    } catch (error) {
      console.error('Error saving edited notification:', error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      const confirmed = window.confirm(`Confirmez-vous la suppression de l'annonce ?`);
      if (confirmed) {
        await axios.delete(`http://localhost:5000/deleteAnnonce/${id}`);
        fetchDataSelect();
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleOpenLargeNotification = (notification) => {
    setSelectedNotification(notification);
    setLargeImageModalOpen(true);
  };

  const handleCloseLargeImageModal = () => {
    setLargeImageModalOpen(false);
    setSelectedNotification(null);
  };

  const openEditModal = (notification) => {
    setEditedNotification(notification);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditedNotification({});
  };

  const handleDeleteImage = () => {
    setEditedNotification({ ...editedNotification, imageUrl: '', image: '' });
  };

  return (
    <div className='rightContent'>
      <div className='Annonces'>
        <div className='allAnnonce'>
          <div className='titleAnnonce'>
            <h2 className='anch1'>Les annonces</h2>
            {!ajouterAnnonce && (
              <button className='ajoutAnnonce' onClick={() => setAjouterAnnonce(true)}>Ajouter un annonce</button>
            )}
          </div>

          {!ajouterAnnonce && ( <div className='rechercheAnnonce'>
            <input
              type="text"
              placeholder="Rechercher une annonce"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='searchInput'
            />
          </div>)}

          {ajouterAnnonce && (
            <div>
              <h2>Ajouter annonce</h2>
              <input
                type='text'
                className='inputAnnonce'
                placeholder="Titre de l'annonce"
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              />
              <textarea
                type='text'
                className='inputAnnonceText'
                placeholder="Texte de la notification"
                value={newNotification.text}
                onChange={(e) => setNewNotification({ ...newNotification, text: e.target.value })}
                style={{ resize: 'none' }}
              ></textarea>
              <input
                className='inputAnnonceImg'
                type='file'
                onChange={(e) => setNewNotification({ ...newNotification, imageUrl: e.target.files[0] })}
              />
              <button className='btnAjoutAnnonce' onClick={handleAddNotification}>Ajouter</button>
              <button className='btnAjoutAnnonce' onClick={() => setAjouterAnnonce(false)}>Annuler</button>
            </div>
          )}

          <div className='listeAnnonces'>
            {filteredNotifications.slice().reverse().map((notification, index) => (
              <div className='annonces' key={index}>
                <div className='InfoAnnonce' onClick={() => handleOpenLargeNotification(notification)}>
                  <p><strong>Titre : </strong>{notification.titre}</p>
                  <p><strong>Date : </strong>{notification.date_publication}</p>
                  {notification.image ? (
                    <div className='imagePlace'>
                      <img
                        className='picAnnonce'
                        src={`http://localhost:5000/images/${notification.image.replace('public\\images\\', '')}`}
                        alt={notification.titre}                      />
                        </div>
                      ) : (
                        <div className='imagePlaceholder'></div>
                      )}
                    </div>
                    <div className='btnAnnonce'>
                      <button className='modifeAnnonce' onClick={() => handleEditNotification(notification, index)}>Modifier</button>
                      <button className='suppAnnonce' onClick={() => handleDeleteNotification(notification.id)}>Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
    
              {selectedNotification && (
                <Modal 
                  isOpen={largeImageModalOpen}
                  onRequestClose={handleCloseLargeImageModal}
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 1000,
                    },
                    content: {
                      position: 'relative',
                      color: '#2a4356',
                      backgroundColor: 'rgb(240, 248, 255)',
                      borderRadius: '8px',
                      maxWidth: '55%',
                      maxHeight: '80%',
                      margin: 'auto',
                      overflow: 'auto',
                    },
                  }}
                >
                  <div className='InfoAnnonceDisplay'>
                    <div className='infoDisplay'>
                      <h3><strong>Titre : </strong>{selectedNotification.titre}</h3>
                      <p><strong>Date : </strong>{selectedNotification.date_publication}</p>
                      <p><strong>Description : </strong>{selectedNotification.contenu}</p>
                    </div>
                    {selectedNotification.image ? (
                      <img
                        src={`http://localhost:5000/images/${selectedNotification.image.replace('public\\images\\', '')}`}
                        alt={selectedNotification.titre}
                      />
                    ) : (
                      <div className='imagePlaceholder'></div>
                    )}
                  </div>
                </Modal>
              )}
    
              {editModalOpen && (
                <Modal
                  isOpen={editModalOpen}
                  onRequestClose={closeEditModal}
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 1000,
                    },
                    content: {
                      position: 'relative',
                      color: '#2a4356',
                      backgroundColor: 'rgb(240, 248, 255)',
                      borderRadius: '8px',
                      maxWidth: '55%',
                      maxHeight: '80%',
                      margin: 'auto',
                      overflow: 'auto',
                    },
                  }}
                >
                  <div className='EditAnnonceModal'>
                    <h2>Modifier l'annonce</h2>
                    <input
                      type='text'
                      className='inputAnnonce'
                      placeholder="Titre de l'annonce"
                      value={editedNotification.titre}
                      onChange={(e) => setEditedNotification({ ...editedNotification, titre: e.target.value })}
                    />
                    <textarea
                      type='text'
                      className='inputAnnonceText'
                      placeholder="Texte de la notification"
                      value={editedNotification.contenu}
                      onChange={(e) => setEditedNotification({ ...editedNotification, contenu: e.target.value })}
                      style={{ resize: 'none' }}
                    ></textarea>
                    {!editedNotification.image ? (
                      <input
                        className='inputAnnonceImg'
                        type='file'
                        onChange={(e) => setEditedNotification({ ...editedNotification, imageUrl: e.target.files[0] })}
                      />
                    ) : (
                      <div className='editAllImg'>
                        <img
                          className='imgEdit'
                          src={`http://localhost:5000/images/${editedNotification.image.replace('public\\images\\', '')}`}
                          alt={editedNotification.titre}
                        />
                        <button className='suppimage' onClick={handleDeleteImage}>Supprimer la photo</button>
                      </div>
                    )}
                    <div className='btnsAnnonce'>
                      <button className='btnAjoutAnnonce' onClick={handleSaveEdit}>Enregistrer</button>
                      <button className='btnAjoutAnnonce' onClick={closeEditModal}>Annuler</button>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        </div>
      );
    };
    
    export default GestionAnnonces;
    
