import React, { FC, useState, useContext } from 'react'

// Context
import WorldContext from '../context/world/WorldContext'

// Models
import { Match as MatchModel, Player } from "../models/index";

export interface MatchesProps {
    round: string, 
    participants: MatchModel,
    closed: boolean
}
 
const Matches: FC<MatchesProps> = ({ round, participants, closed }) => {

    const [ isCountableMatch ] = useState( participants.home.name !== "BYE" )
    const [ homeScore , setHomeScore] = useState( participants.home.score )
    const [ visitorScore , setVisitorScore] = useState( participants.visitor.score )
    const [ matchFinished, setMatchFinished ] = useState( participants.closed )

    const { closeMatch } = useContext( WorldContext )

    const gameFinished = () => {

        const home : Player = {
            id: participants.home.id,
            name: participants.home.name,
            victories: homeScore > visitorScore ? 1 : 0,
            defeats: homeScore < visitorScore ? 1 : 0,
            score: homeScore,
            diff: homeScore - visitorScore 
        }

        const visitor : Player = {
            id: participants.visitor.id,
            name: participants.visitor.name,
            victories: visitorScore > homeScore ? 1 : 0,
            defeats: visitorScore < homeScore ? 1 : 0,
            score: visitorScore,
            diff: visitorScore - homeScore 
        }

        setMatchFinished( true )

        closeMatch({
            id: participants.id, 
            round,
            home,
            visitor,
            closed: true
        })

    }

    const renderScoreInput = (score: number, id: string, handleChange: Function) => {
        
        if( !isCountableMatch ) return null

        if( matchFinished ) {

            return (

                <p className = "font-bold">
                    { score }
                </p>

            )

        }
        else {

            return (

                <input 
                    className = "appearance-none py-1 rounded px-4 focus:outline-none w-24 md:w-auto"
                    type="number" 
                    name= { id } 
                    id= { id }
                    min = "0"
                    onChange = { e => handleChange( e ) }
                    value = { `${ score }` } 
                />

            )

        }

    }

    return ( 

        <div className="bg-gray-100 py-2 px-3.5 md:px-8 rounded mb-8">

            <div className="flex justify-between mb-2">
                <p className = "font-bold">
                    { round }
                </p>

                <p className = { isCountableMatch ? "font-bold" : "text-xs" }>
                    { isCountableMatch ? "Marcador" : "Este juego no afecta el ranking" }
                </p>

            </div>

            <div className="flex justify-between items-center mb-2">

                <p
                    className = "mr-2 md:mr-0"
                >
                    { participants.home.name }
                </p>

                { 
                    renderScoreInput(
                        homeScore,
                        "scoreA",
                        ( e : any ) => setHomeScore( Number(e.target.value) )
                    ) 
                }


            </div>

            <div className="flex justify-between items-center mb-2">

                <p
                    className = "mr-2 md:mr-0"
                >
                    { participants.visitor.name }
                </p>

                { 
                    renderScoreInput(
                        visitorScore,
                        "scoreB",
                        ( e : any ) => setVisitorScore( Number(e.target.value) )
                    ) 
                }


            </div>

            { ( !closed ) && (

                <button
                    className = "bg-yellow-700 transition delay-75 duration-300 ease-in-out delay hover:bg-yellow-800 text-gray-200 py-2 px-4 rounded text-center my-4 md:mb-0 w-full mt-4"
                    onClick = { gameFinished }
                >
                    Finalizar
                </button>

            )}



        </div> 

    );
}
 
export default Matches;