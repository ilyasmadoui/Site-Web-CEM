import React, { useState, useEffect } from 'react';
import '../src_Adminstration/Design.css';
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

  const [largeImageModalOpen, setLargeImageModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [editedNotification, setEditedNotification] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);

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
        </div>
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
                   
                  </div>
                ))}
              </div>
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
      </div>

    </div>
  );
};

export default GestionAnnonces;
