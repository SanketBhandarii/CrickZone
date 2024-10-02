export function handleClick(
  value,
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
) {
  if (wicket < 10 && currentOver < over) {
    const t1Run = parseInt(localStorage.getItem("t1run"));
    if (run + value > t1Run) {
      setRun(run + value);
      setCurrentOver(over);
      return;
      // Here you might want to handle what happens when the run exceeds the target
      // For example, display a message or trigger other actions, but avoid directly setting currentOver
    }
    // Update run and ball based on the value
    setBall((prevBall) => prevBall + 1);
    setRun((prevRun) => prevRun + value);
    setCurrentRun((prevCurrentRun) => [...prevCurrentRun, value]);

    // Check if the updated run exceeds the target and set currentOver if necessary
  }
}
