import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Comment = ({ vlogId }) => {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [messages, setMessages] = useState({ success_msg: '', error_msg: '' });
    useEffect(() => {
        const fetchComments = async () => {
            const res = await axios.get(`http://localhost:8080/comment/${vlogId}`);
            setComments(res.data);
        };
        fetchComments();

    }, [vlogId]);

    const addComment = async (e) => {

        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:8080/comment/add', { vlogId: vlogId, text: text, }, { withCredentials: true });
            setMessages({ success_msg: 'Comment added' });
            const timer = setTimeout(() => {
                setMessages({ success_msg: '', error_msg: '' });
                setComments([...comments, res.data]);
                setText('');
            }, 500);
            return () => clearTimeout(timer);


        } catch (error) {

            setMessages({ error_msg: 'Not signed in' });
            const timer = setTimeout(() => {
                setMessages({ success_msg: '', error_msg: '' });
                setRedirect(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    };
    if (redirect) {
        return navigate('/login');
    }
    return (
        <>
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-96 max-w-md z-[1000] p-4">
                {messages.success_msg && (
                    <div className={'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative '} role="alert">
                        <strong className="font-bold">Success! </strong>
                        <span className="block sm:inline">{messages.success_msg}</span>
                    </div>
                )}
                {messages.error_msg && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{messages.error_msg}</span>
                    </div>
                )}
            </div>
            <div className="p-4 bg-gray-100 rounded-lg my-5 mr-6">
                <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                <form onSubmit={addComment} className="mb-6">
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
                        rows="3"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a comment..."
                        required
                    ></textarea>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600" type="submit">
                        Post Comment
                    </button>
                </form>
                <div>
                    {comments.map((comment) => (
                        <div key={comment._id} className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                    {comment?.user?.username[0]}
                                </div>
                                <div className="ml-3">
                                    <Link to={`/profile/${comment.user._id}`}> <p className="font-semibold text-gray-900">{comment.user.username}</p></Link>
                                    <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-gray-700">{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Comment;
