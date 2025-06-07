import React, { useState, useEffect } from "react";
import '../newTp/PageParent.css';
import { FaEnvelope } from "react-icons/fa"; 
import axios from "axios";

function AbsencesDesEnfants() {
    const [notifications, setNotifications] = useState([]); // Mettre à jour pour gérer un tableau de notifications
    const [profileData, setProfileData] = useState({ id: null, email: null });
    const [selectedNotification, setSelectedNotification] = useState(null); // Pour gérer la notification sélectionnée
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        const saved_email = localStorage.getItem('email');
        if (saved_email) {
            fetchProfileData(saved_email);
        }
    }, []);

    const fetchProfileData = async (email) => {
        try {
            const response = await axios.get('http://localhost:5000/compteInfo', {
                params: { email }
            });
            setProfileData({
                id: response.data.result.id,
                email: response.data.result.email
            });
            fetchNotifications(response.data.result.id);
        } catch (error) {
            console.error('Erreur lors de la récupération des données du profil:', error);
        }
    };

    const fetchNotifications = async (id) => {
        try {
            const response = await axios.get('http://localhost:5000/get_notification_title', {
                params: { id }
            });
            console.log(response.data);
            setNotifications(response.data); // Mettre à jour pour gérer un tableau de notifications
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications:', error);
        }
    };

    const handleNotificationClick = (notification) => {
        console.log("Notification cliquée :", notification);
        setSelectedNotification(notification); // Mettre à jour la notification sélectionnée
        setIsNotificationOpen(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <div className="page-container">
            <h1>*Les Notifications envoyées* </h1>
            <ul className="notification-list">
                {notifications.map((notification, index) => (
                    <li key={index} className="notification-item" onClick={() => handleNotificationClick(notification)}>
                        <div>
                            <FaEnvelope className="email-icon" />
                            <span className="notification-info">{notification.Titre}</span>
                            <span className="notification-info"><pre>{formatDate(notification.created_at)}</pre></span>
                        </div>
                    </li>
                ))}
            </ul>
            {isNotificationOpen && selectedNotification && (
                <div className="modal-content2">
                <span className="close2" onClick={() => setIsNotificationOpen(false)}>X</span> {/* Bouton de fermeture */}
                <div className="notification-details">
                    <span className="notification-message"><pre>{selectedNotification.notification}</pre></span>
                </div>
            </div>
            )}
        </div>
    );
}

export default AbsencesDesEnfants;
