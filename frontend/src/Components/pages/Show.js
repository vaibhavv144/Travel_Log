import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Comment from './Comment';
const Show = () => {
    const params = useParams();
    let [vlog, setVlog] = useState({
        name: '',
        location: '',
        desc: '',
        file: [],
        creator: []
    })
    async function fetchVlog() {
        let res = await axios.get(`http://localhost:8080/${params.id}`);
        let { name, location, desc, file, author } = res.data;
        setVlog({ name, location, desc, file, creator: author });
    }
    useEffect(() => {
        fetchVlog();
    }, []);
    return (
        <>
            <div className='relative h-full'>
                <Header />
                <div className='mt-24 ml-6 '>
                    <p className='max-w-md mx-auto text-4xl'>{vlog.name}</p>
                    <p className='text-xl mb-4'>Location - {vlog.location}</p>
                    <p className='text-lg mb-4'>{vlog.desc}</p>
                    <p className='text-lg mb-2'>Images: </p>
                    <div className='flex flex-wrap gap-x-8 gap-y-4'>
                        {vlog.file.map((item) => {

                            return <img src={require(`../../../Images/${item}`)} alt="nope" className='h-60 w-72 rounded-lg' />
                        })}
                    </div>
                    <div className="flex justify-end mt-4">
                        <div className="flex items-center mb-2 mr-8 text-gray-500">
                            Created by:
                            <div className="ml-2 w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                {vlog.creator.username ? vlog.creator.username[0] : ''}
                            </div>
                            <div className="ml-1">
                                <Link to={`/profile/${vlog.creator._id}`}> <span>{vlog.creator.username}</span></Link>

                            </div>
                        </div>
                    </div>
                    <Comment vlogId={params.id} />
                </div>
                <div className='absolute bottom-[-200px] w-full'>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Show