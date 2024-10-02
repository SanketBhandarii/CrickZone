export function handleWick(value, msg = "W", setWicket, setBall, setCurrentRun, wicket, currentOver, over) {
    if (wicket < 10 && currentOver < over) {
      if (!isNaN(value)) {
        setWicket((prev) => prev + value);
        setBall((prevBall) => prevBall + 1);
        setCurrentRun((prev) => [...prev, msg]);
      } else {
        setCurrentRun((prev) => [...prev, value]);
        setBall((prevBall) => prevBall + 1);
      }
    }
  }
