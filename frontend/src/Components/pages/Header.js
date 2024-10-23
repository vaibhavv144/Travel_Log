import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
function Header() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState({ success_msg: '', error_msg: '' });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);
                setId(userInfo.id);
            });
        });
    }, []);
    function logout() {
        fetch('http://localhost:8080/logout', {
            credentials: 'include',
            method: 'POST',
        }).then(response => {
            setMessages({ success_msg: 'Logout successfully' });
            const timer = setTimeout(() => {
                setMessages({ success_msg: '', error_msg: '' });
                setRedirect(true);
            }, 1000);
            return () => clearTimeout(timer);
        })
        setUsername(null);
    }
    const handleClickOutside = (event) => {
        if (!event.target.closest('#dropdown-button') && !event.target.closest('#dropdown-menu')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    if (redirect)
        navigate('/');
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
            <nav class="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 after:content-[''] after:block after:absolute after:w-full after:h-1 after:bg-orange-500 after:z-10 fixed top-0 left-0 w-full z-[800]">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 ml-7">
                    <Link to='/'>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Travel </span>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap text-orange-400">Vlog</span>
                    </Link>
                    <div id="mega-menu-full" class="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
                        <ul class="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to='/'>
                                    <i class="not-italic block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300"> Home</i>
                                </Link>
                            </li>

                            <li>
                                <Link to='/all'>
                                    <i class="not-italic block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300"> Vlogs</i>
                                </Link>
                            </li>
                            <li>
                                <Link to='/tour'>
                                    <i class="not-italic block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300"> Tour</i>
                                </Link>
                            </li>
                            <li>
                                <Link to='/story'>
                                    <i class="not-italic block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300"> Stories</i>
                                </Link>
                            </li>
                            {
                                username && (<>
                                    <li >
                                        <Link to='/plan'>
                                            <i class="not-italic block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300"> Plans</i>
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to='/new'>
                                            <i class="not-italic block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300"> Create Vlog</i>
                                        </Link>
                                    </li>

                                    <li >
                                        <div className="relative inline-block text-left">
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={toggleDropdown}
                                                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 font-bold  md:dark:hover:text-orange-500  dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300 "
                                                    id="dropdown-button"
                                                    aria-haspopup="true"
                                                    aria-expanded={isOpen}
                                                >
                                                    {username[0]}
                                                </button>
                                            </div>

                                            {isOpen && (
                                                <div
                                                    className="z-[2000] origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="options-menu"
                                                    id="dropdown-menu"
                                                >
                                                    <div className="" role="none">
                                                        <Link
                                                            to={`/profile/${id}`}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black duration-300 rounded-md"
                                                            role="menuitem"
                                                        >
                                                            Profile
                                                        </Link>
                                                        <Link
                                                            to={'/createtrip'}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black duration-300 rounded-md"
                                                            role="menuitem"
                                                        >
                                                            Trips
                                                        </Link>
                                                        <Link onClick={logout}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black duration-300 rounded-md"
                                                            role="menuitem"
                                                        >
                                                            Logout
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                </>
                                )
                            }
                            {
                                !username && (
                                    <>
                                        <li >
                                            <Link to='/login'>
                                                <i class="not-italic block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300">Login</i>
                                            </Link>
                                        </li>
                                        <li >
                                            <Link to='/register'>
                                                <i class="not-italic block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700 duration-300">Register</i>
                                            </Link>
                                        </li>
                                    </>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>


    )
}

export default Header