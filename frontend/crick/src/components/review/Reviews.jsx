import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Amit Sharma",
      videoUrl: "https://www.youtube.com/embed/your_video_id_1",
      title: "CrickZone Changed My Game!",
      description:
        "Using CrickZone has brought a new level of excitement to our local matches. The live score tracking and voice recognition are amazing!",
    },
    {
      id: 2,
      name: "Priya Menon",
      videoUrl: "https://www.youtube.com/embed/your_video_id_2",
      title: "Perfect for Tournament Organizers",
      description:
        "CrickZone made it easy to manage scores during our weekend tournament. The interface is so smooth, and our players loved it!",
    },
    {
      id: 3,
      name: "Rahul Verma",
      videoUrl: "https://www.youtube.com/embed/your_video_id_3",
      title: "A Game Changer for Cricket Fans",
      description:
        "Now I can easily follow all our club matches! CrickZone makes everything more engaging and professional.",
    },
    {
      id: 4,
      name: "Sonia Kapoor",
      videoUrl: "https://www.youtube.com/embed/your_video_id_4",
      title: "Made Scoring Fun and Easy!",
      description:
        "With CrickZone, tracking scores has become so much easier and enjoyable for everyone in our league. Highly recommended!",
    },
  ];

  // Custom Arrow Components
  // Custom Arrow Components
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
    dots: true,
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
              <div className="bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center">
                <iframe
                  width="100%"
                  height="200"
                  src={review.videoUrl}
                  title={review.name}
                  className="rounded-lg mb-4"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
    </div>
  );
};

export default Reviews;
