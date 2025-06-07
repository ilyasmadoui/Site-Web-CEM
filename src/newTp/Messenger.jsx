import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../newTp/PageParent.css'; 
import { FaTrash, FaFileUpload } from 'react-icons/fa';

function Messenger() {
    const [messages, setMessages] = useState([]); 
    const [inputText, setInputText] = useState(""); 
    const [inputSenderEmail, setInputSenderEmail] = useState(""); 
    const [inputEmail, setInputEmail] = useState(""); 
    const [emailError, setEmailError] = useState(""); 
    const [selectedFile, setSelectedFile] = useState(null); 
    const [selectedFileURL, setSelectedFileURL] = useState(""); 

    const sendMessageToServer = async (message) => {
        try {
            const formData = new FormData();
            formData.append('text', message.text);
            formData.append('sender', message.sender);
            formData.append('email', message.email);
            formData.append('from', message.senderEmail);
            if (message.file) {
                formData.append('file', message.file);
            }
    
            await axios.post('http://localhost:5000/envoierMessage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error sending message:', error.message);
        }
    };

    const fetchMessagesFromServer = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        }
    };

    useEffect(() => {
        fetchMessagesFromServer();
    }, []);

    const sendMessage = () => {
        if (inputText.trim() !== "" && validateEmail(inputEmail) && validateEmail(inputSenderEmail)) {
            const message = { 
                text: inputText, 
                sender: "parent", 
                email: inputEmail, 
                senderEmail: inputSenderEmail, 
                file: selectedFile 
            };
            sendMessageToServer(message);
            setMessages([...messages, message]);
            setInputText(""); 
            setInputEmail("");
            setEmailError(""); 
            setInputSenderEmail(""); 
            setSelectedFile(null);
            setSelectedFileURL("");
        } else {
            if (inputText.trim() === "") {
                setEmailError("Please enter a message");
            } else if (!validateEmail(inputEmail)) {
                setEmailError("Please enter a valid recipient email address");
            } else {
                setEmailError("Please enter a valid sender email address");
            }
        }
    };

    const deleteMessage = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/messages/${id}`);
            const updatedMessages = messages.filter(message => message.id !== id);
            setMessages(updatedMessages);
        } catch (error) {
            console.error('Error deleting message:', error.message);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setSelectedFileURL(URL.createObjectURL(file));
        } else {
            setSelectedFileURL("");
        }
    };

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return pattern.test(email);
    };

    return (
        <div className="messenger-container">
            <div className="message-list">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        <div>Email: {message.email}</div>
                        <div>Sender Email: {message.senderEmail}</div>
                        <div>{message.text} <FaTrash className="delete-icon" onClick={() => deleteMessage(message.id)} /></div>
                        {message.fileURL && message.fileURL.startsWith("data:image/") && (
                            <div>
                                <img src={message.fileURL} alt="attachment" className="attached-image" />
                            </div>
                        )}
                        {message.fileURL && !message.fileURL.startsWith("data:image/") && (
                            <div>
                                <a href={message.fileURL} target="_blank" rel="noopener noreferrer">
                                    View File
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="input-container">
                
                <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="Recipient's Email..."
                />
                <input
                    type="email"
                    value={inputSenderEmail}
                    onChange={(e) => setInputSenderEmail(e.target.value)}
                    placeholder="Your Email..."
                />
                {emailError && <div className="error">{emailError}</div>}
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                />
                <label htmlFor="file-input" className="file-label">
                    <FaFileUpload className="upload-icon" />
                </label>
                <input
                    id="file-input"
                    type="file"
                    
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {selectedFile && (
                    <div className="file-preview">
                        {selectedFile.type.startsWith("image/") ? (
                            <img src={selectedFileURL} alt="preview" className="attached-image" />
                        ) : (
                            <span>Selected File: {selectedFile.name}</span>
                        )}
                    </div>
                )}
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Messenger;
