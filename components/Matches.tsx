import React, { FC } from 'react'
import Match from './Match';

export interface MatchesProps {
    round: String, 
    participants: {
        home: {
            name: String,
            score: Number
        },
        visitor: {
            name: String,
            score: Number
        },
    }
}
 
const Matches: FC<MatchesProps> = ({ round, participants }) => {
    return ( 

        <div className="bg-gray-100 py-2 px-3.5 md:px-8 rounded">

            <div className="flex justify-between mb-2">
                <p className = "font-bold">
                    { round }
                </p>

                <p className = "font-bold">
                    Marcador
                </p>

            </div>

            <Match
                name = { participants.home.name }
                score = { participants.home.score }
            />

            <Match
                name = { participants.visitor.name }
                score = { participants.visitor.score }
            />

            <button
                className = "bg-yellow-700 transition delay-75 duration-300 ease-in-out delay hover:bg-yellow-800 text-gray-200 py-2 px-4 rounded text-center my-4 md:mb-0 w-full mt-4"
                onClick = { () => console.log("Guardando marcador . . .") }
            >
                Finalizar
            </button>


        </div> 

    );
}
 
export default Matches;