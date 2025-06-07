import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const GestionNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentNotification, setCurrentNotification] = useState({});
    const [editedMessage, setEditedMessage] = useState('');
    const [editingMessage, setEditingMessage] = useState(false); // Added state for editing mode

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/notifications');
            setNotifications(response.data.notifications);
            setFilteredNotifications(response.data.notifications); // Initialize filtered notifications
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(`Confirmez-vous la supprisson ?`);
    if (confirmed) {

        try {
            await axios.delete(`http://localhost:5000/notificationsSupp/${id}`);
            fetchNotifications();
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    }
    };

    const handleEdit = (notification) => {
        setCurrentNotification(notification);
        setEditedMessage(notification.notification); // Set initial message to be edited
        setEditingMessage(true); // Set editing mode to true
        setModalIsOpen(true);
    };

    const handleCancelEdit = () => {
        setEditingMessage(false); // Set editing mode to false
        setModalIsOpen(false);
    };

    const handleSave = async () => {
        const confirmed = window.confirm(`Confirmez-vous la Modification ?`);
        if (confirmed) {
        try {
            await axios.put(`http://localhost:5000/notifications/${currentNotification.id}`, { message: editedMessage });
            fetchNotifications();
            setEditingMessage(false); // Set editing mode to false
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error updating notification:', error);
        }
    }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredNotifications(notifications); // Show all notifications if search query is empty
        } else {
            const filtered = notifications.filter(notification => {
                return (
                    notification.id.toString().includes(query) || // Check if ID includes query
                    notification.id_parent.toString().includes(query) ||
                    notification.created_at.includes(query) || // Check if date includes query
                    notification.notification.toLowerCase().includes(query.toLowerCase()) // Check if message includes query
                );
            });
            setFilteredNotifications(filtered);
        }
    };

    return (
        <div className="rightContent">
            <div className="topInfo">
                <h1>Gestion des Notifications</h1>
                <div className="searchContainer">
                    <input
                        type="text"
                        placeholder="Rechercher "
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)} // Use handleSearch for filtering
                        className="searchInput"
                    />
                    <button onClick={() => handleSearch(searchQuery)} className="searchButton">Rechercher</button>
                </div>
                <table className="notificationTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID parent</th>
                            <th>Envoyé en</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNotifications.map(notification => ( // Use filteredNotifications instead of notifications
                            <tr key={notification.id}>
                                <td>{notification.id}</td>
                                <td>{notification.id_parent}</td>
                                <td>{notification.created_at}</td>
                                <td className='notificationTd'>
                                    <pre>{notification.notification}</pre>
                                </td>
                                <td>
                                    <button className='editNot' onClick={() => handleEdit(notification)}>Editer</button>
                                    |<button className='suppNot' onClick={() => handleDelete(notification.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                        },
                        content: {
                            color: '#2a4356',
                            backgroundColor: 'rgb(240, 248, 255)',
                            borderRadius: '8px',
                            width: '450px', // Adjust width for better display
                            height: '75vh', // Adjust height for better display
                            margin: 'auto',
                            overflow: 'auto', 
                        }
                    }}
                    isOpen={modalIsOpen}
                    onRequestClose={handleCancelEdit}
                    contentLabel="Edit Notification"
                >
                    <h2>Edit Notification</h2>
                    {editingMessage ? (
                        <textarea
                            value={editedMessage}
                            onChange={(e) => setEditedMessage(e.target.value)}
                            className="editInput"
                            style={{
                                width: '97%', 
                                height: '80%', 
                                resize: 'none', 
                            }}
                        />
                    ) : (
                        <pre>{editedMessage}</pre>
                    )}
                    {editingMessage && (
                        <>
                            <button onClick={handleSave} className="saveButton">Enregister</button>
                            <button onClick={handleCancelEdit} className="cancelButton">Annule</button>
                        </>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default GestionNotification;
