import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [over, setOver] = useState(0);
  const [currentOver, setCurrentOver] = useState(0);
  const [run, setRun] = useState(0);
  const [currentRun, setCurrentRun] = useState([]);
  const [wicket, setWicket] = useState(0);
  const [ball, setBall] = useState(0);
  const [inning, setInning] = useState(null);
  const [match, setMatch] = useState(1);
  const [t1name, setT1name] = useState(null);
  const [t2name, setT2name] = useState(null);
  const [teamInfo, setTeamInfo] = useState(false);
  const [tossWinner, setTossWinner] = useState("");
  const [matchWinner, setMatchWinner] = useState(null);
  const [timeToShowHeader, setTimeToShowHeader] = useState(
    localStorage.getItem("timeToShowHeader") === "true"
  );

  const [userMatchInfo, setUserMatchInfo] = useState([]);
  const values = {
    over,
    setOver,
    currentOver,
    setCurrentOver,
    run,
    setRun,
    wicket,
    setWicket,
    currentRun,
    setCurrentRun,
    ball,
    setBall,
    inning,
    setInning,
    match,
    setMatch,
    t1name,
    t2name,
    setT1name,
    setT2name,
    teamInfo,
    setTeamInfo,
    tossWinner,
    setTossWinner,
    matchWinner,
    setMatchWinner,
    timeToShowHeader,
    setTimeToShowHeader,
    setUserMatchInfo,
    userMatchInfo,
  };

  useEffect(() => {
    localStorage.setItem("timeToShowHeader", timeToShowHeader);
  }, [timeToShowHeader]);
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default ContextProvider;
