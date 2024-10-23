import React, { useEffect } from "react";
import { useState } from "react";
import "./tour.css";
import CardItem from "../Components/TourCard/card";
import axios from 'axios'
import Header from "../Components/pages/Header";
import Footer from "../Components/pages/Footer";
function Tour() {
//what and how
  const [tourcard, setTour] = useState([]);
  let [filtercard, setFilterCard] = useState([]);
  const [searchText, setSearchText] = useState("");
  function filterData(searchText, tourcard) {
    searchText = searchText.trim();
    if (searchText === "") {
      return tourcard;
    }
    else {
      const filteredData = tourcard.filter((vlog) => {
        return vlog.place.includes(searchText);
      });
      return filteredData;
    }
  }

  async function getCards() {
    let res = await axios.get('http://localhost:8080/allcards');
    setTour(res.data);
    setFilterCard(res.data);
  }
  useEffect(() => {
    getCards();
  }, []);


  return (
    <>
      <Header className="z-[-1]" />
      <div className='relative h-[75%] min-h-[600px] bg-gray-900 bg-no-repeat bg-center bg-fixed bg-cover'>
        <div className='absolute w-full h-full z-[99] flex flex-row flex-wrap justify-center items-center	text-center top-0 left-0'>
          <div className='py-24 px-0 w-full max-w-[550px]'>
            <h1 className='text-6xl text-white leading-[1em] uppercase font-medium'>
              Tours
            </h1>
            <div className='text-white py-8 px-0 '>
              <p className='mb-0 font-sans text-xl'>
                Explore top tours and experiences in destinations
              </p>
            </div>

          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[120px] bg-[url('https://travelfreak.com/wp-content/themes/travelfreak/_assets/svg/wave.svg')] bg-no-repeat opacity-100 z-[9] w-full "></div>
        <figure className='absolute top-0 left-0 w-full h-full z-[1] overflow-hidden opacity-50'>
          <img className='text-white h-full w-full object-cover' src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D" alt='...'></img>
        </figure>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        const data = filterData(searchText, tourcard);
        setFilterCard(data);
      }}>
        <label for="default-search" class="my-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-700">Search</label>
        <div class="relative w-[30%] mt-4 mx-3">
          <input value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }
            } type="search" id="default-search" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Vlogs" required />
          <button type="submit" class="text-white absolute end-2 bottom-[0.4rem] bg-orange-500 hover:bg-gray-800  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-500 ">Search</button>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: 'wrap',
          margin: '30px auto',
        }}

      >

        {filtercard.map((item, idx) => {
          return (
            <CardItem key={idx} {...item} />
          )
        })}

      </div>
      <Footer />
    </>
  );
}

export default Tour;
