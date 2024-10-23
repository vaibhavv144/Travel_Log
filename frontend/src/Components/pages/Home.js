import React,{useEffect,useState} from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import CardItem from "../../Components/TourCard/card";
import Crousel from '../../Components/pages/crousel'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './Footer';
import axios from 'axios';
function Home() {
    const [id, setId] = useState(false);
    const [tourcard, setTour] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setId(userInfo.id);
            });
        });
    }, []);
    async function getCards() {
        let res = await axios.get('http://localhost:8080/allcards');
        setTour(res.data);
    }
    useEffect(() => {
        getCards();
    }, []);

    const firstFive = tourcard.slice(3, 7);
    return (
        <div>
            <Header />
            <div className='relative h-4/5 min-h-[600px] bg-gray-900 bg-no-repeat bg-center bg-fixed bg-cover'>
                <div className='absolute w-full h-full z-[99] flex flex-row flex-wrap justify-center items-center	text-center top-0 left-0'>
                    <div className='py-24 px-0 w-full max-w-[550px]'>
                        <h1 className='text-7xl text-white leading-[1em] uppercase font-medium'>
                            Travel <br />Like a Pro
                        </h1>
                        <div className='text-white py-8 px-0 '>
                            <p className='mb-0 font-sans text-xl'>
                                Welcome to our vlogging platform, where your adventures come to life! Capture the essence of your travels and share your experiences with the world.
                            </p>
                        </div>
                        <div className='p-0 m-0 no-underline list-none border-0 outline-none '>
                            {
                                id===undefined && <Link to='/register'>
                                    <i class="not-italic text-white bg-orange-500	border-none shadow-[inset_0_-5px_0px_0px_rgba(0,0,0,0.15),0_0_10px_rgba(0,0,0,0.1)]  inline-block relative text-base uppercase leading-[1em] text-center overflow-hidden rounded-xl cursor-pointer align-middle pt-4 px-7 pb-4 hover:bg-gray-800 font-semibold">GET STARTED</i>
                                </Link>
                            }
                            {
                                id && <Link to='/all'>
                                    <i class="not-italic text-white bg-orange-500	border-none shadow-[inset_0_-5px_0px_0px_rgba(0,0,0,0.15),0_0_10px_rgba(0,0,0,0.1)]  inline-block relative text-base uppercase leading-[1em] text-center overflow-hidden rounded-xl cursor-pointer align-middle pt-4 px-7 pb-4 hover:bg-gray-800 font-semibold">GET STARTED</i>
                                </Link>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[120px] bg-[url('https://travelfreak.com/wp-content/themes/travelfreak/_assets/svg/wave.svg')] bg-no-repeat opacity-100 z-[9] w-full "></div>
                <figure className='absolute top-0 left-0 w-full h-full z-[1] overflow-hidden opacity-50'>
                    <img className='text-white h-full w-full object-cover' src="https://travelfreak.com/wp-content/uploads/2018/07/adventure-seeker-1200x800.jpg" alt='...'></img>
                </figure>
            </div>
            <h1 className="heading ml-8 font-semibold ">Our Featured Tours</h1>
            <div className='flex flex-wrap my-[30px] mx-8'>

                {firstFive.map((item, idx) => {
                    return (
                        <CardItem key={idx} {...item}  />
                    )
                })}
            </div>
            <div className='m-12'>
                <Crousel />
            </div>
            <Footer/>
        </div>
    )
}

export default Home