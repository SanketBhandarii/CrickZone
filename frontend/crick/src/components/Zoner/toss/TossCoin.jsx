import { useContext, useEffect, useState } from "react"
import { Context } from "../../../store/Context"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"

function TossCoin() {
  const { t1name, t2name, teamInfo, setTossWinner } = useContext(Context)
  const [tossResult, setTossResult] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (teamInfo === false) {
      navigate("/zone")
    }
    setTimeout(() => {
      const random = Math.floor(Math.random() * 2) + 1
      setTossResult(random === 2 ? "H" : "T")
    }, 100)
  }, [teamInfo, navigate])

  function handleClick(event) {
    if (tossResult === event.target.value) {
      setTossWinner(t1name)
    } else {
      setTossWinner(t2name)
    }
    setTimeout(() => {
      navigate("/zone/toss/choosefor")
    }, 400)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">🏏 Match Setup</h1>
        <p className="text-zinc-400">Time to toss the coin and decide who goes first</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4">
        <Badge variant="secondary" className="bg-zinc-800">
          1. Teams
        </Badge>
        <div className="w-8 h-px bg-zinc-700" />
        <Badge variant="default" className="bg-blue-600">
          2. Toss
        </Badge>
        <div className="w-8 h-px bg-zinc-700" />
        <Badge variant="secondary" className="bg-zinc-800">
          3. Choose
        </Badge>
      </div>

      {/* Main Content */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center gap-2 mb-4">
            <Coins className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Coin Toss</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-white mb-4">Spinning the Coin!</h1>
              <img
                src="https://i.pinimg.com/originals/d7/49/06/d74906d39a1964e7d07555e7601b06ad.gif"
                alt="Coin Toss"
                className="w-40 h-40 rounded-full mb-4"
              />
              <h1 className="text-2xl font-bold text-white">Who will win?</h1>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                <h4 className="text-sm font-medium text-zinc-400 mb-2">Who Will We Spin Up?</h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    value="H"
                    onClick={handleClick}
                    className="w-full justify-between bg-zinc-800 border-zinc-700 hover:bg-cyan-950 hover:border-blue-500"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-cyan-900 flex items-center justify-center mr-2">
                        <span className="text-cyan-200 text-xs">H</span>
                      </div>
                      <span className="text-white">{t1name}</span>
                    </div>
                    <span className="text-zinc-400">HEADS</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    value="T"
                    onClick={handleClick}
                    className="w-full justify-between bg-zinc-800 border-zinc-700 hover:bg-orange-950 hover:border-orange-500"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mr-2">
                        <span className="text-orange-200 text-xs">T</span>
                      </div>
                      <span className="text-white">{t2name}</span>
                    </div>
                    <span className="text-zinc-400">TAILS</span>
                  </Button>
                </div>
              </div>

              <div className="text-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm">Choose Your Side: The Coin Will Decide!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-zinc-300 mb-2">💡 Quick Tips:</h4>
        <ul className="text-xs text-zinc-500 space-y-1">
          <li>• Winning the toss gives you the choice to bat or bowl first</li>
          <li>• Consider pitch conditions when making your decision</li>
        </ul>
      </div>
    </div>
  )
}

export default TossCoin
