import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Zap, Star } from "lucide-react";

function Features() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-4">
      <div className="max-w-4xl mx-auto space-y-7">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mt-5">
          <Button
            onClick={() => navigate("/zone")}
            variant="ghost"
            className="text-zinc-400 bg-neutral-900 hover:bg-neutral-800 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <p className="text-zinc-400">
              Discover what makes CrickZone special
            </p>
          </div>
        </div>

        {/* Voice Feature Highlight */}
        <Card className="bg-gradient-to-r from-blue-900/50 to-teal-900/50 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Mic className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Voice Control Feature
                </h2>
                <p className="text-zinc-300 mb-4">
                  Use voice commands like{" "}
                  <span className="text-blue-400 font-semibold">"one run"</span>{" "}
                  or <span className="text-blue-400 font-semibold">"wide"</span>{" "}
                  to update the score instantly.
                </p>
                <Button
                  onClick={() => navigate("/zone")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Try It Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Image */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/dyrmawqcn/image/upload/v1736140369/speechFeature_tdtds6.png"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                alt="Voice Control Feature Demo"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Features;
