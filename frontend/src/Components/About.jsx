import React from 'react'
import Signup from './Signup';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function HeroSection() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  // const navigate = useNavigate();
  const cardData = [
    {
      title: "Medicine Recommendations",
      description: "Quick & accurate medication guidance",
      description1: "Digital prescriptions for easy access.",
      description2: "Reduced risk of self-medication errors.",
      image: "https://d1krbhyfejrtpz.cloudfront.net/blog/wp-content/uploads/2020/02/07160337/What-is-e-Prescription-Software.png",
    },
    {
      title: "Video Callings",
      description: "Beneficial for rural areas and elderly patients.",
      description1: "Encrypted calls ensure patient confidentiality.",
      description2: "Reduces hospital visits and long waiting times.",
      image: "https://static.vecteezy.com/system/resources/previews/008/916/728/non_2x/human-hand-holding-smartphone-with-video-call-to-man-doctor-character-on-screen-using-mobile-advise-or-consultation-vector.jpg",
    },
    {
      title: "Maps",
      description: "Helps users find the nearest hospital.",
      description1: "Quick access to nearby medical centers.",
      description2: "Interactive and easy to use.",
      image: "https://media.istockphoto.com/id/1363480730/photo/local-map-pin-marker-search.jpg?s=612x612&w=0&k=20&c=AFAa-Mbys77CM4g4HR1FWH3klnkJYmAYXbh7KJgKeK8=",
    },
  ];

  return (
    <div className='pt-12 min-h-screen bg-[#D8EFED]'>
      <h1 className='flex justify-center font-bold text-4xl poppins text-[#064848]'>About</h1>
      <div className="flex justify-center items-center w-full gap-10 p-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl  shadow-xl overflow-hidden transition-transform transform hover:scale-105 duration-300 w-100 h-[500px] [perspective:1000px]"
          >
            <div className="relative w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-500">
              {/* Front Side */}
              <div className="absolute w-full h-full [backface-visibility:hidden]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-5 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 p-3">{card.title}</h2>
                  <ul className='p-4 flex flex-col justify-start'>
                    <li className="text-gray-600 mt-2 list-disc text-lg font-semibold">{card.description}</li>
                    <li className="text-gray-600 mt-2 list-disc text-lg font-semibold">{card.description1}</li>
                    <li className="text-gray-600 mt-2 list-disc text-lg font-semibold">{card.description2}</li>
                  </ul>
                </div>
              </div>


              <div className="absolute w-full  h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#064848] rounded-2xl flex flex-col items-center justify-center p-5">
                <h2 className="text-2xl font-bold text-white mb-4">{card.title}</h2>
                <p className="text-white text-center mb-6">Discover more about our {card.title.toLowerCase()} feature</p>
                <button onClick={() => setIsSignupOpen(true)} className='cursor-pointer bg-white text-[#064848] p-3 rounded-full poppins hover:scale-110 transform duration-300 font-semibold ease-in-out hover:text-yellow-300'>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isSignupOpen && <Signup setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
      {isSigninOpen && <Signin setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
    </div>
  )
}

export default HeroSection