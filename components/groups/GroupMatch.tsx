import React, { FC, useState } from 'react'

// Model
import { Match } from '../../models'

export interface GroupMatchProps {
    round: string, 
    participants: Match,
    closed: boolean
}
 
const GroupMatch: FC<GroupMatchProps> = ({ round, participants, closed }) => {

    const [ homeScore , setHomeScore] = useState( participants.home.score )
    const [ visitorScore , setVisitorScore] = useState( participants.visitor.score )
    const [ matchFinished, setMatchFinished ] = useState( participants.closed )

    const renderScoreInput = (score: number, id: string, handleChange: Function) => {
        
        
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
                    // onClick = { gameFinished }
                >
                    Finalizar
                </button>

            )}



        </div> 

    );
}
 
export default GroupMatch;