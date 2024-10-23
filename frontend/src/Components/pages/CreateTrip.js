import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const CreateTrip = () => {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [visible, setVisisble] = useState(true);
    const [matches, setMatches] = useState([]);
    const [noMatches, setNoMatches] = useState(false);
    const navigate = useNavigate();

    const SearchBuddy = async () => {
        try {
            const res = await axios.get('http://localhost:8080/travelbuddies', {
                params: { destination, startDate, endDate },
                withCredentials: true
            });

            setMatches(res.data);
            setNoMatches(res.data.length === 0);
        } catch (err) {
            console.error('Error finding matches', err);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/trips', {
                destination,
                startDate,
                endDate
            }, { withCredentials: true });
            setDestination('');
            setStartDate('');
            setEndDate('');

            setVisisble(false);
            SearchBuddy();
        } catch (err) {
            console.error('Error creating trip', err);
            navigate('/login');
        }
    };

    return (
        <>
            <div className='relative min-h-screen'>
                <Header />

                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-4 bg-white shadow-md rounded-lg mb-3">
                    <h2 className="text-2xl mb-4">Create Trip</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Destination</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <button type="submit" className="btn w-full p-2 rounded">Create Trip</button>
                </form>
                {
                    !visible && <div className="max-w-4xl mx-auto mt-24 mb-4">
                        <h2 className="text-2xl mb-4">Your matches</h2>
                        <div className="mt-8 space-y-6">
                            {noMatches && (
                                <div className="text-center text-gray-500 text-lg font-medium">
                                    No matches found for your search criteria.
                                </div>
                            )}
                            {
                                matches.map((match) => (
                                    <div key={match._id} className="p-6 bg-white shadow-lg rounded-lg">
                                        <h3 className="text-xl font-semibold text-blue-600">{match.user.username}</h3>
                                        <p className="text-gray-600 mt-2">
                                            <strong>Destination:</strong> {match.destination}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Travel Dates:</strong>{' '}
                                            {new Date(match.startDate).toLocaleDateString()} - {new Date(match.endDate).toLocaleDateString()}
                                        </p>
                                        <button className="btn" onClick={() => navigate(`/messages/${match.user._id}`)}>Message</button>
                                    </div>
                                ))}
                        </div>
                    </div>
                }
                <div className='absolute bottom-[-180px] w-full'>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default CreateTrip;
