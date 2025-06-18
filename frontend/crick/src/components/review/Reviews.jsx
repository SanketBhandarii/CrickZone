import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, X, Star, Quote } from "lucide-react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";

const Reviews = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const reviews = [
    {
      id: 1,
      name: "Amit Sharma",
      role: "Tournament Organizer",
      videoUrl:
        "https://res.cloudinary.com/dyrmawqcn/video/upload/v1731517544/vd-1_ec8uuq.mp4",
      thumbnail: user1,
      title: "CrickZone Changed My Game!",
      description:
        "Using CrickZone has brought a new level of excitement to our local matches. The live score tracking and voice recognition are amazing!",
      rating: 5,
    },
    {
      id: 2,
      name: "Rahul Verma",
      role: "Club Captain",
      videoUrl:
        "https://res.cloudinary.com/dyrmawqcn/video/upload/v1731517582/vd-3_ofem9n.mp4",
      thumbnail: user3,
      title: "Perfect for Tournament Management",
      description:
        "CrickZone made it easy to manage scores during our weekend tournament. The interface is so smooth, and our players loved it!",
      rating: 5,
    },
    {
      id: 3,
      name: "Akash Gupta",
      role: "Cricket Enthusiast",
      videoUrl:
        "https://res.cloudinary.com/dyrmawqcn/video/upload/v1731517580/vd-2_unh1y8.mp4",
      thumbnail: user2,
      title: "A Game Changer for Cricket Fans",
      description:
        "Now I can easily follow all our club matches! CrickZone makes everything more engaging and professional.",
      rating: 5,
    },
    {
      id: 4,
      name: "Sonia Kapoor",
      role: "League Coordinator",
      videoUrl: null,
      thumbnail: null,
      title: "Made Scoring Fun and Easy!",
      description:
        "With CrickZone, tracking scores has become so much easier and enjoyable for everyone in our league. Highly recommended!",
      rating: 5,
    },
  ];

  const openVideoModal = (videoUrl) => {
    if (!videoUrl) return;
    setSelectedVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoUrl(null);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/zone")}
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="h-6 w-px bg-zinc-700" />
          <div>
            <h1 className="text-3xl font-bold text-white">User Reviews</h1>
            <p className="text-zinc-400">
              See what our community says about CrickZone
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/30 transition-all duration-300 group cursor-pointer"
              onClick={() => openVideoModal(review.videoUrl)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Video Thumbnail or Avatar */}
                  <div className="relative">
                    {review.thumbnail ? (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-zinc-800">
                        <img
                          src={review.thumbnail || "/placeholder.svg"}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-5 h-5 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-zinc-800/50 rounded-lg flex items-center justify-center">
                        <Quote className="w-8 h-8 text-zinc-600" />
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">
                      {review.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                      {review.description}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="pt-3 border-t border-zinc-800">
                    <p className="text-white font-medium text-sm">
                      {review.name}
                    </p>
                    <p className="text-zinc-500 text-xs">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <Button
              onClick={closeModal}
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:bg-white/10 z-10"
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                controls
                autoPlay
                className="w-full max-h-[70vh] object-contain"
              >
                <source src={selectedVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
