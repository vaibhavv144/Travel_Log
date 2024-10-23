import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import MessageList from './MessageList';

const UserProfile = () => {
    const params = useParams();
    const userId = params.id;
    const [user, setUser] = useState(null);
    const [vlogs, setVlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [id, setId] = useState(null);
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/user/${userId}`, { withCredentials: true });
                setUser(res.data.user);
                setVlogs(res.data.vlogs);
                setComments(res.data.comments);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };
        fetchProfile();
    }, [userId]);

    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setId(userInfo.id);
            });
        });
    }, []);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await axios.get('http://localhost:8080/allconversations', { withCredentials: true });
                setConversations(res.data);
            } catch (error) {
                console.error('Error fetching conversations', error);
            }
        };
        fetchConversations();
    }, []);
    const handleSubmit = (id) => {
        navigate(`/show/${id}`);
    };
    if (!user && !id) navigate('/login');
    return (
        <>
            <div className='relative min-h-screen'>
                <Header />
                <div className="max-w-4xl mx-auto p-4 mt-16">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between gap-x-64">
                            {
                                user && <div className='flex items-center space-x-4'>
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                        {user?.username[0]}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold">{user.username}</h2>
                                        <p className="text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                            }
                            {
                                userId === id && <div className='mx-auto'>
                                    <button className="btn my-4" onClick={() => navigate('/expenses')}>My expenses</button>
                                </div>
                            }
                        </div>
                        {
                            vlogs.length > 0 && <div className="mt-6">
                                <h3 className="text-xl font-semibold">Vlogs</h3>
                                <div className="space-y-4 mt-4">
                                    {vlogs.map(post => (
                                        <div key={post._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                            <h4 className="text-lg font-semibold">{post.name}</h4>
                                            <p>{post.desc}</p>
                                            <form className="max-w-md mt-3">
                                                <button type="submit" className="btn" onClick={() => handleSubmit(post._id)}>Read More</button>
                                            </form>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        {comments.length > 0 && <div className="mt-8">
                            <h3 className="text-xl font-semibold">Comments</h3>
                            <div className="space-y-4 mt-4">
                                {comments.map(comment => (
                                    <div key={comment._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                        <p>{comment.text}</p>
                                        <p className="text-sm text-gray-600">On: {comment.vlog.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>}

                        {
                            userId !== id && <div className="mt-8">
                                <MessageList />
                            </div>
                        }
                        {userId === id && conversations.length > 0 && <div className="mt-8">
                            <h3 className="text-xl font-semibold">Messages</h3>
                            <div className="space-y-4 mt-4">
                                {conversations.map(convo => (
                                    <div key={convo._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                        <h4 className="text-lg font-semibold">{convo.user.username}</h4>
                                        <button className="btn" onClick={() => navigate(`/messages/${convo.user._id}`)}>View Messages</button>
                                    </div>
                                ))}
                            </div>
                        </div>}

                    </div>
                </div>
                <div className='absolute bottom-[-200px] left-0 w-full'>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default UserProfile;
