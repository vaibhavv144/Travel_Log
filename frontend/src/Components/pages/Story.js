import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer'
function Story() {

    const [stories, setStories] = useState([]);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);

            });
        });
    }, []);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await axios.get('http://localhost:8080/stories', { withCredentials: true });
                setStories(res.data);
            } catch (err) {
                console.error('Error fetching stories', err);
            }
        };
        const timer = setTimeout(() => {
            fetchStories();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const nextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            setCurrentImageIndex(0);
        }
    };

    const prevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
            setCurrentImageIndex(0);
        }
    };

    const nextImage = () => {
        if (currentImageIndex < stories[currentStoryIndex].images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    var currentStory = 0;
    var currentImage = 0;
    if (stories.length > 0) {
        currentStory = stories[currentStoryIndex];
        currentImage = currentStory.images[currentImageIndex];
    }
    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
                <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                    {
                        username && <div className='flex items-center justify-center my-5'>

                            <Link to='/createstory'><img src={require('./adds.png')} className='h-10 w-10' alt='...' /> </Link>

                        </div>
                    }

                    {
                        stories.length === 0 && <div className="text-center text-gray-500 text-lg font-medium">
                            No story found
                        </div>
                    }
                    {
                        stories.length > 0 &&
                        <>

                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                    {currentStory.user.username[0]}
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold">{currentStory.user.username}</p>
                                    <p className="text-gray-500 text-sm">{new Date(currentStory.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mb-4">
                                <button onClick={prevImage} className="h-8 w-8 text-white rounded-full bg-gray-200 flex items-center justify-center  font-bold  md:dark:hover:text-orange-500  dark:hover:text-orange-500 md:dark:hover:bg-gray-600 dark:border-gray-700 duration-300 mr-2">
                                    &lt;
                                </button>
                                <img src={require(`../../../Images/${currentImage}`)} alt="Story" className="h-64 w-80 rounded-lg" />
                                <button onClick={nextImage} className="h-8 w-8 text-white rounded-full bg-gray-200 flex items-center justify-center  font-bold  md:dark:hover:text-orange-500  dark:hover:text-orange-500 md:dark:hover:bg-gray-600 dark:border-gray-700 duration-300  ml-2">
                                    &gt;
                                </button>
                            </div>
                            <p className="mb-4">{currentStory.caption}</p>
                            <div className="flex justify-between">
                                <button onClick={prevStory} className="btn rounded">
                                    Previous Story
                                </button>
                                <button onClick={nextStory} className="btn rounded">
                                    Next Story
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Story