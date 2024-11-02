
import React, { useContext } from 'react'
import { Context } from '../../store/Context'
 
 function CurrentScore() {
    const {run, wicket, match, inning} = useContext(Context);
   return (
     <div className='font-semibold text-lg text-center text-neutral-800 w-auto'>
      <h1><span className="text-sky-600">{inning}</span> Is Batting 🏏</h1>
        Current Score : {run} runs and {wicket} wickets
        {match == 2 ? (
            <h1 className='text-sky-600'>Target : {parseInt(localStorage.getItem("t1run")) + 1}</h1>
          ) : null}
     </div>
   )
 }
 
 export default CurrentScore