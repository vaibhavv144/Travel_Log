import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:8080', { withCredentials: true });
const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const params = useParams();
    const receiverId = params.id;
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/message/${receiverId}`, { withCredentials: true });
                setMessages(res.data);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };
        fetchMessages();
        socket.on('receiveMessage', (message) => {
            if (message.sender === receiverId || message.receiver === receiverId) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [receiverId]);

    const handleSendMessage = async () => {
        try {
            const res = await axios.post('http://localhost:8080/send/message', { receiver: receiverId, text }, { withCredentials: true });
            setMessages([...messages, res.data]);
            setText('');
            socket.emit('sendMessage', res.data);
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>
            <div className="h-60 overflow-y-scroll mb-4 border-2 p-3 rounded-md">
                {messages.map((msg) => (
                    <div key={msg._id} className={`mb-2 ${msg.sender._id === receiverId ? 'text-left' : 'text-right'}`}>
                        <div className="inline-block bg-gray-200 rounded-lg p-2">
                            <span className="font-semibold">{msg.sender._id === receiverId ? msg.sender.username : 'me'}: </span>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border-2 border-gray-400 p-2 rounded flex-grow mx-3" placeholder='Type message...'
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessageList;
