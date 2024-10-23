import React, { useEffect, useState } from 'react'
import Vlog from './Vlog';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
function AllVlogs() {
    let [vlogs, setVlogs] = useState([]);
    let [filtervlogs, setFilterVlogs] = useState([]);
    const [searchtxt, setSeachTxt] = useState("");


    function filterData(searchtxt, vlogs) {
      
        searchtxt = searchtxt.trim();
        if (searchtxt === "") {
            return vlogs;
        }
        else {
            const filteredData = vlogs.filter((vlog) => {
                return vlog.name.includes(searchtxt);
            });
            return filteredData;
        }

    }
    async function getVlogs() {
        let res = await axios.get('http://localhost:8080/allvlogs');
        setVlogs(res.data);
        setFilterVlogs(res.data);
    }
    useEffect(() => {
        getVlogs();
    }, []);


    return (
        <>
            <div className='relative min-h-screen'>
                <Header />
                <div className="mt-24 mb-3 md:w-full mx-auto">
                    <div className="relative mb-4 w-full flex  items-center flex-col">
                        <h2 className='max-w-md text-4xl z-51 font-semibold '>Vlogs</h2>
                        <label for="default-search" class="my-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-700">Search</label>
                        <div class="relative w-[30%] mt-4">
                            <input value={searchtxt}
                                onChange={(e) => {
                                    setSeachTxt(e.target.value);
                                }
                                } type="search" id="default-search" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Vlogs" required />
                            <button type="button" onClick={() => {
                                const data = filterData(searchtxt, vlogs);
                                setFilterVlogs(data);
                            }} class="text-white absolute end-2 bottom-[0.4rem] bg-orange-500 hover:bg-gray-800  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-500 ">Search</button>
                        </div>



                    </div>
                </div>
                <div className='flex flex-wrap my-[30px] mx-8'>

                    {filtervlogs.map((item) => {
                        if (item)
                            return <Vlog {...item} item={item} key={item._id} id={item._id} />
                        return 0;
                    })}
                </div>
                <div className='absolute bottom-[-180px] left-0 w-full'>
                    <Footer />
                </div>
            </div>        
        </>
    )
}

export default AllVlogs