import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Newspaper, Loader2, Clock, TrendingUp } from "lucide-react"

const CurrentNews = () => {
  const [matchData, setMatchData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const PROXY_SERVER = import.meta.env.VITE_BACKEND_URL

  const fetchLatestMatches = async () => {
    try {
      const response = await axios.get(`${PROXY_SERVER}/latest/cricknews`)
      setMatchData(response.data.topHeadlines)
    } catch (error) {
      console.error("Error fetching live matches:", error)
      setMatchData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLatestMatches()
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={() => navigate("/zone")}
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="h-6 w-px bg-zinc-700 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Cricket Headlines</h1>
                <p className="text-sm text-zinc-400">Latest updates from the cricket world</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-zinc-300">Live Updates</span>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
            <CardContent className="p-12 sm:p-16 text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Loading Headlines</h3>
              <p className="text-zinc-400">Fetching the latest cricket news...</p>
            </CardContent>
          </Card>
        ) : matchData.length > 0 ? (
          <div className="space-y-4">
            {matchData.map((headline, index) => (
              <Card
                key={index}
                className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/30 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0 group-hover:bg-blue-300 transition-colors" />
                    <div className="flex-1">
                      <h3 className="text-white font-medium leading-relaxed group-hover:text-blue-100 transition-colors text-sm sm:text-base">
                        {headline}
                      </h3>
                      <div className="flex items-center gap-2 mt-3">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span className="text-xs text-zinc-500">Just now</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
            <CardContent className="p-12 sm:p-16 text-center">
              <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No Headlines Available</h3>
              <p className="text-zinc-400">Check back later for the latest cricket news.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default CurrentNews
