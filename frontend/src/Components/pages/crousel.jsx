import React from "react";
import './crousel.css'
import Slider from "react-slick";
import "../TourCard/card.css"
  
function Crousel() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
      };

  return (
    
    <div className="w-[94%] my-[50px] mx-auto"> 

      <div className="mt-[5rem]">

        <Slider {...settings}>
        {data.map((d) => (     
          <div className="bg-white h-[450px] text-black rounded-xl fig">               
                <div className="h-56  flex justify-center items-center"> 
              <img src={d.img} alt="" className="h-56 w-full rounded-t-xl"/>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 p-4">
                    <p className="text-xl font-semibold">{d.name}</p>
                    <p className="meta info">{d.review}</p>
                    <button>Read More</button>
                </div>
          </div>
          
        ))}
        </Slider>
      </div>

    </div>
  );
}

const data = [

  {
    name: "Neeraj Chopra",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRomdPhP_VzQ6TpDa8_g87yoFiqrWRDMjzuXg&s",
    review:"This website has revolutionized how I plan my trips! The ability to connect with like-minded travelers and find travel buddies has made my adventures even more exciting."
  },
  {
    name: "Yogi Adityanath",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQfw1IvWUrbRI33gKXJhee4Od4GIJTqTE55g&s",
    review:"From finding travel buddies to keeping track of expenses, this platform has everything a traveler could need. The matchmaking feature is brilliant, helping me connect with people who share my travel interests and schedules."
  },
  {
    name: "Vidyut Jamwal",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsgl56HGQY-ovNYCgBaUu1k-HGSIXiXdI-w&s",
    review:"As someone who often travels solo, this website has been a game-changer. The matchmaking tool allowed me to meet fellow travelers on my recent trip, and the messaging system made it easy to plan and coordinate."
  },
  {
    name: "Saurabh Singh Shekhawat",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQod4OJjqMaALawJTQRWacwTESnQsSyQ6c-WQ&s",
    review:"This site is incredibly well-thought-out, from the detailed search options to the personalized user experiences. The expense tracking tool has been a lifesaver for managing my travel budget, and the real-time messaging keeps me connected with fellow travelers. "
  },
  {
    name: "Diljit Dosanjh",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ExUrA8UR5SvtzaJl7S2k-La9M_9vpZfgcg&s",
    review:"This website has everything I've ever wanted as a frequent traveler. The ability to find and connect with other travelers with similar destinations and dates has made my trips much more enjoyable."
  },
  {
    name: "Parmish Verma",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFJQP2l-pJdmnYxD-UD42GjaSByKa13ve6A&s",
    review:"I love how this site makes travel planning both easy and fun. The intuitive design, combined with powerful tools like matchmaking and expense tracking, makes it a go-to for all my travel needs."
  },
  
];


export default Crousel;

