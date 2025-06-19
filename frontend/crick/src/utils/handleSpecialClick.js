export function handleSpecialClick(
    msg,
    setBall,
    setRun,
    setCurrentRun,
    currentOver,
    over,
    wicket,
    setCurrentOver,
    run
) { 
  if (wicket < 10 && currentOver < over) {
    const t1Run = parseInt(localStorage.getItem("t1run"));
   
    if (msg === "Wide" || msg === "No ball") {
      setRun((prevRun) => prevRun + 1);
      setCurrentRun((prev) => [...prev, msg]);
    } else {
      setRun((prevRun) => prevRun + 1);
      setCurrentRun((prev) => [...prev, msg]);
      setBall((prevBall) => prevBall + 1);
    }

    if (run + 1 > t1Run) {
      setCurrentOver(over);
      return;
    }
  }
}
