import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';
function CreateStory() {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        images.forEach(image => formData.append('images', image));

        try {
            let res = await axios.post('http://localhost:8080/stories', formData, { withCredentials: true });
            setCaption('');
            setImages([]);
            const timer = setTimeout(() => {
                setRedirect(true);
            }, 1000);

        } catch (err) {
            navigate('/login');
        }
    };
    if (redirect) {
        return navigate('/story');
    }
    return (
        <>
            <Header />
            <div className='mt-24'>
                <p className='text-3xl m-4'>Create Story</p>
                <div className='border-2 w-3/4 m-2 rounded-lg border-gray-400'>
                    <form class="max-w-md m-8" onSubmit={handleSubmit}>
                        <div class="mb-6">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your caption</label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={caption} name='desc' onChange={(e) => { setCaption(e.target.value) }} required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black" for="multiple_files">Upload Images</label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" name='file' onChange={handleImageChange} multiple required />
                        </div>

                        <button type="submit" class="btn p-2">Post story</button>
                    </form>
                </div>
            </div>
            <div className='absolute bottom-[-180px] left-0 w-full'>
                <Footer />
            </div>
        </>
    );

}

export default CreateStory