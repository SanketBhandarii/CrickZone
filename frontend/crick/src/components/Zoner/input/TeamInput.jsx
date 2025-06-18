import { useContext, useEffect, useState } from "react"
import { Context } from "../../../store/Context"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Zap, Play, AlertCircle } from "lucide-react"

const TeamField = ({ label, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm text-zinc-400">{label}</label>
    <Input
      placeholder={`Enter ${label.toLowerCase()}`}
      onChange={onChange}
      minLength="2"
      maxLength="20"
      required
      className="bg-zinc-800 border-zinc-700 text-white text-center font-medium"
    />
  </div>
)

function TeamInput() {
  const navigate = useNavigate()
  const { setT1name, setT2name, t1name, t2name, setOver, setTeamInfo, setTimeToShowHeader, user, setUser } = useContext(Context)
  const [message, setMessage] = useState("")

  useEffect(() => {
    localStorage.clear();
    setT1name("");
    setT2name("");
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/home`, { withCredentials: true })
      .then(res => {
        if (res.data.msg !== "Please do login!") {
          setUser(res.data.username)
          setTimeToShowHeader(true)
        } else {
          navigate("/zone/login")
        }
      }).catch(err => console.error("Auth error:", err))
  }, [])

  useEffect(() => setMessage(""), [t1name, t2name])

  const handleForm = (e) => {
    e.preventDefault()
    if (!t1name || !t2name || t1name.toLowerCase() === t2name.toLowerCase()) {
      setMessage("Enter valid and different team names")
      return
    }
    setTeamInfo(true)
    navigate("/zone/toss")
  }

  const teamsReady = t1name && t2name;
  const oversStep = teamsReady && t1name.toLowerCase() !== t2name.toLowerCase()

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">🏏 New Match Setup</h1>
        <p className="text-zinc-400">
          Hey there👋, <span className="text-amber-400">{user || "Let's set up your teams!"}</span>
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-4">
        <Badge className="bg-blue-600">1. Teams</Badge>
        <div className="w-8 h-px bg-zinc-700" />
        <Badge className="bg-zinc-800">2. Overs</Badge>
        <div className="w-8 h-px bg-zinc-700" />
        <Badge className="bg-zinc-800">3. Toss</Badge>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-8 space-y-8">
          {message && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">{message}</span>
            </div>
          )}

          <form onSubmit={handleForm} className="space-y-8">
            {/* Team Inputs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Choose Your Teams</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <TeamField label="Team A" onChange={(e) => setT1name(e.target.value)} />
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">VS</span>
                  </div>
                </div>
                <TeamField label="Team B" onChange={(e) => setT2name(e.target.value)} />
              </div>

              {teamsReady && (
                <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <span className="text-green-400 text-sm">✓ Teams selected: {t1name} vs {t2name}</span>
                </div>
              )}
            </div>

            {/* Overs */}
            {oversStep && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Match Format</h3>
                </div>
                <div className="flex justify-center">
                  <div className="w-32">
                    <label className="text-sm text-zinc-400 block mb-2 text-center">No. of overs</label>
                    <Input
                      type="number"
                      placeholder="No. of overs"
                      onChange={(e) => setOver(e.target.value)}
                      max="50"
                      min="1"
                      required
                      className="bg-zinc-800 border-zinc-700 text-white text-center text-xl font-bold"
                    />
                    <p className="text-xs text-zinc-500 text-center mt-1">1-50 overs</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={!oversStep}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold group"
              >
                <Play className="w-5 h-5 mr-2" />
                Proceed to Toss
                <span className="ml-2 group-hover:translate-x-1 transition-transform">🏏</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-zinc-300 mb-2">💡 Quick Tips:</h4>
        <ul className="text-xs text-zinc-500 space-y-1">
          <li>• Use short team names for better display</li>
          <li>• T20 format = 20 overs, ODI = 50 overs</li>
          <li>• You'll choose batting/bowling after toss</li>
        </ul>
      </div>
    </div>
  )
}

export default TeamInput
