import React, { useState, useEffect } from 'react'
import Header from './Header';
import Footer from './Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Expense() {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({ yesterday: 0, lastWeek: 0, month: 0 });
    const [username, setUsername] = useState(null);
    useEffect(() => {
        fetch('/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);
            });
        });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/expense', { description, amount }, { withCredentials: true });
            expenses.push(res.data);
            setDescription('');
            setAmount('');
        } catch (error) {
            console.error('Error adding expense', error);
        }
    };
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await axios.get('http://localhost:8080/expense', { withCredentials: true });
                setExpenses(res.data);
            } catch (error) {
                console.error('Error fetching expenses', error);
            }
        };

        fetchExpenses();
    }, [expenses]);
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get('http://localhost:8080/summary', { withCredentials: true });
                setSummary(res.data);
            } catch (error) {
                console.error('Error fetching expense summary', error);
            }
        };

        fetchSummary();
    }, [expenses]);
    return (
        <>
            <div className='relative min-h-screen'>
                <Header />
                <div className="max-w-4xl mx-auto p-4 mt-16">
                    <h2 className="text-4xl font-bold mb-6">Expenses</h2>
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border-2 border-gray-400 p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="border-2 border-gray-400 p-2 rounded w-full"
                            />
                        </div>
                        <button type="submit" className="btn my-4">Add Expense</button>
                    </form>
                    {
                        expenses.length > 0 && <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
                            <ul>
                                {expenses.map(expense => (
                                    <li key={expense._id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                        <p className="text-lg">{expense.description}</p>
                                        <p className="text-gray-600">Amount: ₹{expense.amount}</p>
                                        <p className="text-gray-600">Date: {new Date(expense.date).toLocaleDateString()}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Expense Summary</h2>
                        <div className="flex justify-between">
                            <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold">Yesterday</h3>
                                <p className="text-gray-700">₹{summary.yesterday}</p>
                            </div>
                            <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md text-center mx-2">
                                <h3 className="text-xl font-semibold">Last 7 Days</h3>
                                <p className="text-gray-700">₹{summary.lastWeek}</p>
                            </div>
                            <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold">This Month</h3>
                                <p className="text-gray-700">₹{summary.month}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-[-200px] left-0 w-full'>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Expense;