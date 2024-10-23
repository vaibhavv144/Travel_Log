import React, { useState, useEffect } from "react";
import "./card.css";
import { Link } from "react-router-dom";
import axios from 'axios'
function CardItem(props) {
  const [username, setUsername] = useState(null);
  const [messages, setMessages] = useState({ success_msg: '', error_msg: '' });
  const addItem = async (event) => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:8080/${props._id}/addCard`, {}, { withCredentials: true });

    if (response.status === 200) {
      setMessages(response.data);
      const timer = setTimeout(() => {
        setMessages({ success_msg: '', error_msg: '' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }
  useEffect(() => {
    fetch('http://localhost:8080/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUsername(userInfo.username);
      });
    });
  }, []);
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
      <div className="figure">

        <img src={props.Image} alt="..." />
        <figcaption>

          <p className="name">{props.place}</p>
          <p className="info">{props.p}</p>
          {
            username &&
            <Link to={{ pathname: "/card", state: { Image: props.Image, p: props.p } }} >
              {
                <button className="btn" onClick={addItem}>Add to plans</button>
              }

            </Link>
          }


        </figcaption>

      </div>
    </>
  );
}
export default CardItem;
