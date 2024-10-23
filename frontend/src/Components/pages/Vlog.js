import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import "../TourCard/card.css"

function Vlog({ item, key }) {

  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [unid, setUnid] = useState(null);
  const [messages, setMessages] = useState({ success_msg: '', error_msg: '' });
  useEffect(() => {
    fetch('http://localhost:8080/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUsername(userInfo.username);
        setUnid(userInfo.id);
      });
    });
  }, []);

  const handleSubmit = (id) => {
    navigate(`/show/${id}`);
  };
  const handleSubmit2 = (id) => {
    navigate(`/edit/${id}`)
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/${id}`);
      setMessages({ success_msg: 'Deleted successfully' });
      const timer = setTimeout(() => {
        setMessages({ success_msg: '', error_msg: '' });
        navigate('/all');
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error deleting vlog:', error);
    }
  };
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
      <div className='figure'>
        <figcaption>
          <img src={require(`../../../Images/${item.file[0]}`)} alt="..." />
          <p className='name'>{item.name}</p>
          <p className='info' >{item.desc}</p>
          <div className='flex'>
            <form className="max-w-md m-3">
              <button type="submit" className="btn" onClick={() => handleSubmit(item._id)}>Read More</button>
            </form>
            {
              unid === item.author._id && (<form className="max-w-md m-3 ">

                <button type="submit" className="btn" onClick={() => handleSubmit2(item._id)}>Edit</button>
              </form>)
            }
            {
              item.author && unid === item.author._id &&
              (<form className="m-3">
                <button
                  type="submit"
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </form>)}
          </div>
        </figcaption>
      </div>
    </>
  )
}

export default Vlog