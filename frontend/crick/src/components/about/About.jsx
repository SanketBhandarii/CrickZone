import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Target, Zap, Users, Heart, Twitter, Facebook, Instagram } from "lucide-react"

const About = () => {
  const navigate = useNavigate()

  const features = [
    "Real-time score updates",
    "Dynamic score tracking for various cricket formats",
    "User-friendly interface for easy navigation",
    "Voice recognition system for seamless score updates",
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-8">
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
            <h1 className="text-3xl font-bold text-white">About CrickZone</h1>
          </div>
        </div>

        {/* Mission Section */}
        <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Our Mission</h2>
                <p className="text-zinc-300 leading-relaxed">
                  At CrickZone, our mission is to revolutionize how cricket enthusiasts manage their scores and track
                  game statistics. We aim to create a user-friendly platform that enhances the enjoyment of the game,
                  making it accessible for everyone, from casual players to serious enthusiasts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-4">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Our Values</h2>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  We believe in the spirit of sportsmanship, teamwork, and fair play. Our goal is to make the score
                  tracking system fair and visible to all players and users.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  We have implemented a voice recognition system that updates scores only when the match umpire or
                  tournament manager speaks, ensuring accuracy and engagement in the game.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Join Us Section */}
        <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Join Us!</h2>
                <p className="text-zinc-300 leading-relaxed">
                  Whether you're a player, coach, or fan, CrickZone welcomes you to be a part of our journey. Together,
                  let's make cricket even more exciting!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <p className="text-zinc-400 mb-6">Follow us on social media for updates</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:bg-zinc-700/50 transition-colors"
              >
                <Twitter className="w-4 h-4 text-blue-400" />
                <span className="text-zinc-300 text-sm">Twitter</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:bg-zinc-700/50 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-500" />
                <span className="text-zinc-300 text-sm">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:bg-zinc-700/50 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="text-zinc-300 text-sm">Instagram</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default About
