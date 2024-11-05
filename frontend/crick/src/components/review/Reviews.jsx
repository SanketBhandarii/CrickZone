import React from "react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Amit Sharma",
      videoUrl: "https://www.youtube.com/embed/your_video_id_1",
      title: "CrickZone Changed My Game!",
      description:
        "Using CrickZone has brought a new level of excitement to our local matches. The live score tracking and voice recognition are amazing!"
    },
    {
      id: 2,
      name: "Priya Menon",
      videoUrl: "https://www.youtube.com/embed/your_video_id_2",
      title: "Perfect for Tournament Organizers",
      description:
        "CrickZone made it easy to manage scores during our weekend tournament. The interface is so smooth, and our players loved it!"
    },
    {
      id: 3,
      name: "Rahul Verma",
      videoUrl: "https://www.youtube.com/embed/your_video_id_3",
      title: "A Game Changer for Cricket Fans",
      description:
        "Now I can easily follow all our club matches! CrickZone makes everything more engaging and professional."
    },
    {
      id: 4,
      name: "Sonia Kapoor",
      videoUrl: "https://www.youtube.com/embed/your_video_id_4",
      title: "Made Scoring Fun and Easy!",
      description:
        "With CrickZone, tracking scores has become so much easier and enjoyable for everyone in our league. Highly recommended!"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-cyan-900 to-gray-900 min-h-screen py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-200 mb-8">User Reviews</h1>
        <p className="text-lg text-gray-300 mb-12">
          Hear from our users on how CrickZone has transformed their cricket experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              <iframe
                width="100%"
                height="200"
                src={review.videoUrl}
                title={review.name}
                className="rounded-lg mb-4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h2 className="text-xl font-bold text-white mb-2">{review.title}</h2>
              <p className="text-gray-300 text-sm mb-2">{review.description}</p>
              <p className="text-gray-500 text-xs">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
