import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/Context";
import { useNavigate } from "react-router-dom";

function TossCoin() {
  const { t1name, t2name, teamInfo, setTossWinner } = useContext(Context);
  const [tossResult, setTossResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (teamInfo === false) {
      navigate("/zone");
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
    <div className="flex flex-col sm:flex-row h-[60vh] max-md:h-[70vh] max-w-4xl mx-auto mt-1 rounded-lg   shadow-xl overflow-hidden max-sm:mx-3">
      {/* Left Side - Teal */}
      <div className="flex-1 bg-sky-500 w-[500px] flex items-center justify-center py-8 max-md:py-4 max-md:max-w-full">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Spinning the Coin!</h1>
          <img
            src="https://i.pinimg.com/originals/d7/49/06/d74906d39a1964e7d07555e7601b06ad.gif"
            alt="Coin Toss"
            className="rounded-full w-64 max-w-full my-4 max-md:w-56"
          />
          <h1 className="text-2xl font-bold">Who will win?</h1>
        </div>
      </div>

      {/* Right Side - Yellow */}
      <div className="flex-1 bg-white flex items-center justify-center ">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-neutral-800 text-2xl font-semibold py-4 text-center max-sm:text-xl max-sm:py-2">
            Who Will We Spin Up?
          </h2>
          <div className="flex gap-4">
            <button
              className="bg-sky-500 text-white rounded-md py-3 px-4 mt-4 hover:bg-sky-600 transition duration-300 w-auto max-sm:py-2 max-sm:px-2 max-sm:mt-2"
              value="H"
              onClick={handleClick}
            >
              {t1name} (HEADS)
            </button>
            <button
              className="bg-orange-500 text-white rounded-md py-3 px-4 mt-4 hover:bg-orange-600 transition duration-300 w-auto  max-sm:py-2 max-sm:px-2 max-sm:mt-2"
              value="T"
              onClick={handleClick}
            >
              {t2name} (TAILS)
            </button>
          </div>
          <h2 className="text-neutral-800 text-xl w-80 font-semibold py-7 text-center max-sm:py-4 max-sm:text-lg">
            Choose Your Side: The Coin Will Decide!
          </h2>
        </div>
      </div>
    </div>
  );
}

export default TossCoin;
