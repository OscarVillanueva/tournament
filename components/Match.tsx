import React, { FC, useState } from 'react'

export interface MatchProps {
    name: String,
    score: Number
}
 
const Match: FC<MatchProps> = ({ name, score }) => {

    const [gameScore, setGameStore] = useState( score )

    return ( 
        <div className="flex justify-between items-center mb-2">

            <p
                className = "mr-2 md:mr-0"
            >
                { name }
            </p>

            <input 
                className = "appearance-none py-1 rounded px-4 focus:outline-none w-24 md:w-auto"
                type="number" 
                name="scoreA" 
                id="scoreA"
                min = "0"
                onChange = { e => setGameStore( Number(e.target.value) ) }
                value = { `${gameScore}` } 
            />

        </div>
    );
}
 
export default Match;