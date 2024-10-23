import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';
function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState(false);
    const [messages, setMessages] = useState({ success_msg: '', error_msg: '' });
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password,
            }, { withCredentials: true });
            if (response.status === 200) {
                setMessages({ success_msg: 'Login successfully' });
                const timer = setTimeout(() => {
                    setMessages({ success_msg: '', error_msg: '' });
                    setRedirect(true);
                }, 1000);
                return () => clearTimeout(timer);
            }
            else
                setMessages({ error_msg: 'Login failed' });
        }
        catch (e) {
            setMessages({ error_msg: 'Login failed' });
            const timer = setTimeout(() => {
                setMessages({ success_msg: '', error_msg: '' });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }
    if (redirect) {
        return navigate('/');
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
            <div className="absolute bg-[url('https://img.freepik.com/free-photo/office-supplies_23-2148103974.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=ais_user')] bg-no-repeat bg-cover h-full w-full">
                <Header />
                <div className='max-w-md mx-auto mt-20 p-9 border-2 rounded-xl border-gray-400 mb-28'>
                    <div className="max-w-md mx-auto pl-28 text-3xl">Login</div>
                    <form className="max-w-md mx-auto" onSubmit={submit} >
                        <div className="relative z-0 w-full group mb-7">
                            <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer my-3" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="" required />
                            <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        </div>
                        <div className="relative z-0 w-full  group mb-7">
                            <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="" required />
                            <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <button type="submit" className="text-white bg-orange-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-6">Submit</button>
                    </form>
                    <p className='text-gray-600'>Don't have account : <Link className='underline text-blue-600' to='/register'>Signup</Link></p>
                </div>
                <div>
                    <Footer />
                </div>

            </div>
        </>
    )
}

export default Login