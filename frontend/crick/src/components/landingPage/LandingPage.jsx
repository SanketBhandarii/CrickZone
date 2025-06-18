
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Activity,
  Github,
  Trophy,
  ArrowRight,
  Star,
} from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            Crick<span className="text-blue-400">Zone</span>
          </h1>
        </div>
        <a
          href="https://github.com/SanketBhandarii/CrickZone"
          className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800/50 transition-all duration-200"
        >
          <Github className="w-5 h-5 text-zinc-400 hover:text-white" />
        </a>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-zinc-300">
              The Future of Cricket Scoring
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block text-white">Cricket Scoring</span>
              <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of cricket scoring with voice
              commands, real-time updates, and seamless match management.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink to="/zone">
              <Button className="bg-white text-black hover:bg-zinc-200 px-8 py-6 text-lg font-semibold group">
                Start Scoring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/30 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <Activity className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Real-Time Scoring
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Track every run, wicket, and over with lightning-fast updates
                that keep everyone in sync.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/30 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <Mic className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Voice Commands
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Simply speak "four runs" or "wicket" and watch the scoreboard
                update instantly with AI precision.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/30 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                <Trophy className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Match Management
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                From local games to tournaments, manage every format with
                professional-grade tools.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-24 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-zinc-400">Matches Scored</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-zinc-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-zinc-400">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-zinc-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
