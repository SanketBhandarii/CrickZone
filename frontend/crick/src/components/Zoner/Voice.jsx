import { useState, useEffect, useContext } from "react"
import { handleClick } from "../../utils/handleClick.js"
import { handleSpecialClick } from "../../utils/handleSpecialClick.js"
import { handleWick } from "../../utils/handleWick.js"
import { Context } from "../../store/Context.jsx"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"

function Voice() {
  const {
    setBall,
    setRun,
    setCurrentRun,
    currentOver,
    over,
    wicket,
    run,
    setCurrentOver,
    setMatchWinner,
    setWicket,
    inning,
    setCurrentWicket,
  } = useContext(Context)

  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser.")
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    if (isListening) {
      recognition.start()
    }

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase()
      setTranscript(spokenText)
      handleVoiceCommand(spokenText)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    return () => {
      recognition.stop()
    }
  }, [isListening])

  function showFeatureInfo() {
    setShowInfo(true)
  }

  const handleVoiceCommand = (command) => {
    if (command.includes("one run")) {
      handleClick(
        1,
        setBall,
        setRun,
        setCurrentRun,
        currentOver,
        over,
        wicket,
        run,
        setCurrentOver,
        inning,
        setMatchWinner,
      )
    } else if (command.includes("two runs")) {
      handleClick(
        2,
        setBall,
        setRun,
        setCurrentRun,
        currentOver,
        over,
        wicket,
        run,
        setCurrentOver,
        inning,
        setMatchWinner,
      )
    } else if (command.includes("three runs")) {
      handleClick(
        3,
        setBall,
        setRun,
        setCurrentRun,
        currentOver,
        over,
        wicket,
        run,
        setCurrentOver,
        inning,
        setMatchWinner,
      )
    } else if (command.includes("four runs")) {
      handleClick(
        4,
        setBall,
        setRun,
        setCurrentRun,
        currentOver,
        over,
        wicket,
        run,
        setCurrentOver,
        inning,
        setMatchWinner,
      )
    } else if (command.includes("five runs")) {
      handleClick(
        5,
        setBall,
        setRun,
        setCurrentRun,
        currentOver,
        over,
        wicket,
        run,
        setCurrentOver,
        inning,
        setMatchWinner,
      )
    } else if (command.includes("six runs")) {
      handleClick(
        6,
        setBall,
        setRun,
        setCurrentRun,
        currentOver,
        over,
        wicket,
        run,
        setCurrentOver,
        inning,
        setMatchWinner,
      )
    } else if (command.includes("wide")) {
      handleSpecialClick("Wide", setBall, setRun, setCurrentRun, currentOver, over, wicket, setCurrentOver, run)
    } else if (command.includes("no ball")) {
      handleSpecialClick("No ball", setBall, setRun, setCurrentRun, currentOver, over, wicket, setCurrentOver, run)
    } else if (command.includes("wicket" || "wicked")) {
      handleWick(1, "W", setWicket, setBall, setCurrentRun, wicket, currentOver, over)
    } else if (command.includes("dot ball")) {
      handleWick(0, "Dot", setWicket, setBall, setCurrentRun, wicket, currentOver, over)
    }
  }

  return (
    <Button
      onClick={() => setIsListening((prevState) => !prevState)}
      onMouseOver={() => !isListening && showFeatureInfo()}
      onMouseDownCapture={() => setShowInfo(false)}
      className={`rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${
        isListening ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4 mr-2" />
          Stop Listening
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 mr-2" />
          Start Listening
        </>
      )}
    </Button>
  )
}

export default Voice
