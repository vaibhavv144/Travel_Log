import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../routes/tour.css'
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
function Plans() {
    const [tourcard, setTour] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    async function getCards() {
        try {
            let res = await axios.get('http://localhost:8080/cards', { withCredentials: true });
            setTour(res.data.cart);
        }
        catch (e) {
            setRedirect(true);
        }

    }
    useEffect(() => {
        getCards();
    }, []);
    if (redirect) {
        return navigate('/login');
    }
    return (
        <>
            <div className='relative min-h-screen'>
                <Header />
                <div className='mt-28 ml-6 mb-32'>
                    <p className='text-3xl'>Plans</p>
                    <div className='flex flex-wrap'>
                        {tourcard.map((item, idx) => {
                            return (
                                <Card key={idx}  {...item} />
                            )
                        })}
                    </div>
                </div>
                <div className='absolute bottom-[-200px] left-0 w-full'>
                    <Footer className />
                </div>
            </div>

        </>

    )
}

export default Plans