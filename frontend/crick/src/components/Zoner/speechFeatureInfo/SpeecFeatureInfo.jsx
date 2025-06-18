import { Mic } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

function SpeechFeatureInfo() {
  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 max-w-2xl w-full mx-auto ">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Mic className="w-4 h-4 text-blue-400" />
            <h3 className="font-semibold text-white">Voice Control Feature</h3>
          </div>
          <p className="text-sm text-zinc-400">
            See the new feature! Use voice commands like <span className="text-blue-400 font-medium">"one run"</span> or{" "}
            <span className="text-blue-400 font-medium">"wide"</span> to update the score.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SpeechFeatureInfo
