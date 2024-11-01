import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/Context";
import { useNavigate } from "react-router-dom";
import tossgif from "../../../assets/tossgif.gif";

function TossCoin() {
  const { t1name, t2name, teamInfo, setTossWinner } = useContext(Context);
  const [tossResult, setTossResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (teamInfo === false) {
      navigate("/");
    }
    setTimeout(() => {
      const random = Math.floor(Math.random() * 2) + 1;
      setTossResult(random === 2 ? "H" : "T");
    }, 100);
  }, [teamInfo, navigate]);

  function handleClick(event) {
    if (tossResult === event.target.value) {
      setTossWinner(t1name);
    } else {
      setTossWinner(t2name);
    }
    setTimeout(() => {
      navigate("/toss/choosefor");
    }, 400);
  }

  return (
    <div className="max-sm:h-height-1 max-sm:w-width-1 flex flex-col justify-center items-center bg-white max-w-md px-6 py-6 rounded-lg w-width-3">
      <h1 className="text-sky-500 text-xl font-semibold py-4 text-center">
        Tossing the coin for you
      </h1>
      <img
        src="https://i.pinimg.com/originals/d7/49/06/d74906d39a1964e7d07555e7601b06ad.gif"
        alt="Coin Toss"
        className="rounded-full w-64 max-w-full"
      />
      <div className="flex flex-col items-center justify-center gap-2 mt-4">
        <div className="flex gap-4">
          <button
            className="bg-sky-500 text-white rounded-md py-3 px-3 mt-4 hover:bg-sky-600 transition duration-300 w-auto"
            value="H"
            onClick={handleClick}
          >
            {t1name} (HEADS)
          </button>
          <button
            className="bg- text-white rounded-md py-3 bg-lime-500 hover:bg-lime-600 px-3 mt-4 transition duration-300 w-auto"
            value="T"
            onClick={handleClick}
          >
            {t2name} (TAILS)
          </button>
        </div>
        <h2 className="text-neutral-800 text-xl font-semibold py-4 text-center">
          Who will we spin up?
        </h2>
      </div>
    </div>
  );
}

export default TossCoin;
