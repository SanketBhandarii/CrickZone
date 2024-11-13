import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
// import vd1 from "/videos/vd-1.mp4";
// import vd2 from "/videos/vd-2.mp4";
// import vd3 from "/videos/vd-3.mp4";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import { useNavigate } from "react-router-dom";

const vd1 = "/videos/vd-1.mp4";
const vd2 = "/videos/vd-2.mp4";
const vd3 = "/videos/vd-3.mp4";


const Reviews = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const reviews = [
    {
      id: 1,
      name: "Amit Sharma",
      videoUrl: vd1,
      thumbnail: user1,
      title: "CrickZone Changed My Game!",
      description:
        "Using CrickZone has brought a new level of excitement to our local matches. The live score tracking and voice recognition are amazing!",
    },
    {
      id: 2,
      name: "Rahul Verma",
      videoUrl: vd3,
      thumbnail: user3,
      title: "Perfect for Tournament Organizers",
      description:
        "CrickZone made it easy to manage scores during our weekend tournament. The interface is so smooth, and our players loved it!",
    },
    {
      id: 3,
      name: "Akash Gupta",
      videoUrl: vd2,
      thumbnail: user2,
      title: "A Game Changer for Cricket Fans",
      description:
        "Now I can easily follow all our club matches! CrickZone makes everything more engaging and professional.",
    },
    {
      id: 4,
      name: "Sonia Kapoor",
      videoUrl: null,
      thumbnail: null,
      title: "Made Scoring Fun and Easy!",
      description:
        "With CrickZone, tracking scores has become so much easier and enjoyable for everyone in our league. Highly recommended!",
    },
  ];

  const openVideoModal = (videoUrl) => {
    if (videoUrl == null) {
      navigate("/reviews");
      return;
    }
    setSelectedVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoUrl(null);
  };

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 cursor-pointer bg-slate-600 hover:bg-slate-600 rounded-full p-3 m-2"
      onClick={onClick}
    >
      <FaArrowRight className="text-2xl text-white" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 cursor-pointer bg-slate-600 hover:bg-slate-600 rounded-full p-3 m-2"
      onClick={onClick}
    >
      <FaArrowLeft className="text-2xl text-white" />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-cyan-900 to-gray-900 min-h-screen py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-200 mb-8">
          User Reviews
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          Hear from our users on how CrickZone has transformed their cricket
          experience.
        </p>

        <Slider {...settings} className="px-4">
          {reviews.map((review) => (
            <div key={review.id} className="px-4">
              <div
                className="bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer"
                onClick={() => openVideoModal(review.videoUrl)}
              >
                <div
                  className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: `url(${review.thumbnail})` }}
                >
                  <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <button className="text-white text-3xl">▶</button>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {review.title}
                </h2>
                <p className="text-gray-300 text-sm mb-2">
                  {review.description}
                </p>
                <p className="text-gray-500 text-xs">— {review.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-black p-4 max-w-3xl w-full rounded-lg">
            <button
              className="absolute top-4 left-4 text-white bg-yellow-700 p-3 rounded-full text-2xl cursor-pointer z-20"
              onClick={closeModal}
            >
              <FaTimes />

            </button>
            <video
              src={selectedVideoUrl}
              controls
              autoPlay
              className="w-full max-h-[70vh] object-contain rounded-lg"
              type="video/mp4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
