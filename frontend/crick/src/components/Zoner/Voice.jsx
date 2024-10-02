import React, { useState, useEffect, useContext } from "react";
import { handleClick } from "../../utils/handleClick.js";
import { handleSpecialClick } from "../../utils/handleSpecialClick.js"; // Ensure correct path
import { handleWick } from "../../utils/handleWick.js"; // Ensure correct path
import { Context } from "../../store/Context.jsx";
import SpeecFeatureInfo from "./speechFeatureInfo/SpeecFeatureInfo.jsx";

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
    setCurrentWicket, // Add this if you need to manage current wickets separately
  } = useContext(Context);

  const [isListening, setIsListening] = useState(false); // State to track if we're listening
  const [transcript, setTranscript] = useState("");
  const [showInfo, setShowInfo] = useState(false); // State to store the recognized text

  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false; // Stop automatically after recognizing a phrase
    recognition.interimResults = false; // Only show final results, not interim
    recognition.lang = "en-US"; // Set language to English

    // Start recognition when we want to listen
    if (isListening) {
      recognition.start();
    }

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      setTranscript(spokenText);

      // Call a function to update the score based on recognized commands
      handleVoiceCommand(spokenText);
    };

    recognition.onend = () => {
      setIsListening(false); // Stop listening when recognition ends
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false); // Handle errors and stop listening
    };

    return () => {
      recognition.stop(); // Clean up when the component is unmounted
    };
  }, [isListening]);

  function showFeatureInfo() {
    setShowInfo(true);
  }

  // Function to handle recognized voice commands
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
        setMatchWinner
      );
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
        setMatchWinner
      );
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
        setMatchWinner
      );
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
        setMatchWinner
      );
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
        setMatchWinner
      );
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
        setMatchWinner
      );
    } else if (command.includes("wide")) {
      handleSpecialClick(
        "Wide",
        setBall,
        setRun,
        setCurrentRun,
        currentOver,
        over,
        wicket,
        setCurrentOver,
        run
      );
    } else if (command.includes("no ball")) {
      handleSpecialClick(
        "No ball",
        setBall,
        setRun,
        setCurrentRun,
        currentOver,
        over,
        wicket,
        setCurrentOver,
        run
      );
    } else if (command.includes("wicket" || "wicked")) {
      handleWick(
        1, // Increment by 1 for each wicket
        "W",
        setWicket,
        setBall,
        setCurrentRun,
        wicket,
        currentOver,
        over
      );
    } else if (command.includes("dot ball")) {
      handleWick(
        0, // Increment by 1 for each wicket
        "Dot",
        setWicket,
        setBall,
        setCurrentRun,
        wicket,
        currentOver,
        over
      );
    }
    // Add more commands as needed
  };

  return (
    <div>
      {/* {showInfo && <SpeecFeatureInfo />} */}
      <button
        onClick={() => setIsListening((prevState) => !prevState)}
        onMouseOver={() => !isListening && showFeatureInfo()}
        onMouseDownCapture={() => setShowInfo(false)}
        className={`h-12 w-40 rounded-full text-white px-4 py-2 ${
          isListening
            ? "bg-red-600 hover:bg-red-700"
            : "bg-indigo-600 hover:bg-indigo-700"
        } shadow-lg transition duration-200 ease-in-out transform hover:scale-105`}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
    </div>
  );
}

export default Voice;
