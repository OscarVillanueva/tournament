import React, { FC, useContext, useEffect, useState } from 'react'
// import "brackets-viewer/dist/brackets-viewer.min.js"
// import "brackets-viewer/dist/brackets-viewer.min.css"
import { Modal } from '@material-ui/core'

// Context
import EliminationContext from '../../context/elimination/EliminationContext'
import GlobalContext from '../../context/global/GlobalContext'

declare global {
    interface Window { bracketsViewer: any }
}

const Draws: FC = () => {

    const {  ranking, matches, config, updateScore } = useContext( EliminationContext )
    const { changeTournamentStatus } = useContext( GlobalContext )

    const [current, setCurrent] = useState( null )
    const [isOpen, setIsOpen] = useState(false)

    const [scoreA, setScoreA] = useState( current ? current.opponent1.score : 0 )
    const [scoreB, setScoreB] = useState( current ? current.opponent2.score : 0 )

    useEffect(() => {
        
        if( typeof window !== "undefined" && matches.length > 0 ) {

            generateBrackets()

        }

        if( matches.length > 0 ) changeTournamentStatus( false )

    },  [ matches ])

    const generateBrackets = async () => {

        try {

            const example = document.querySelector('#example')
            example.innerHTML = ""

            window.bracketsViewer.render({
                stages: [ config ],
                matches: matches,
                matchGames: [],
                participants: ranking
            }, {
                selector: '#example',
                participantOriginPlacement: 'before',
                separatedChildCountLabel: true,
                showSlotsOrigin: true,
                showLowerBracketSlotsOrigin: false,
                highlightParticipantOnHover: true,

            })

            const matchesElement = example.querySelectorAll(".match") 
            
            matchesElement.forEach( e => {
                
                e.addEventListener('click', (e) => {
                    e.preventDefault()
                    
                    let target = e.target as HTMLElement

                    while( !target.getAttribute( "data-match-id" ) )
                        target = target.parentElement

                    const bridge = matches.find( i => i.id === target.getAttribute( "data-match-id" ) )

                    if( bridge.opponent2.name !== "BYE" ) {
                        setCurrent( bridge )
                        setIsOpen( true )
                    }

                })

            })
            
            
        } catch (error) {
            console.log(error)
        }

    }

    const gameFinished = () => {
        
        if( scoreA.trim() !== "" && scoreB.trim() !== "") {

            const matchFinished = {
                ...current,
                closed: true,
                opponent1: {
                    ...current.opponent1,
                    result: scoreA > scoreB ? "win" : "loss",
                    score: scoreA
                },
                opponent2: {
                    ...current.opponent2,
                    result: scoreA > scoreB ? "loss" : "win",
                    score: scoreB
                }
            }   
    
            updateScore( matchFinished )
            setIsOpen( false )
            setScoreA( 0 )
            setScoreB( 0 )

        }


    }

    return ( 

        <>

            <div id="example" className = "bracket-viewer"></div>

            { current && (
                
                <Modal
                    className = "flex items-center justify-center"
                    open = { isOpen && !current.closed }
                    onClose = { () => setIsOpen( false ) }
                >
                    
                    <div className="bg-green-800 w-3/5 p-10 rounded">

                        <h1
                            className = "text-xl font-bold text-center mb-4 text-white"
                        >
                            Actualizar marcador
                        </h1>

                        <div className="md:flex md:justify-between md:items-center mb-2">

                            <p
                                className = "mr-0 md:mr-2 mb-2 md:mb-0 text-white"
                            >
                                { current.opponent1.name }
                            </p>

                            <input 
                                className = "appearance-none py-1 rounded px-4 focus:outline-none w-24 md:w-auto w-full"
                                type="number" 
                                name= { current.opponent1.id } 
                                id= { current.opponent1.id }
                                min = "0"
                                onChange = { e => setScoreA( e.target.value ) }
                                value = { `${ scoreA }` } 
                            />


                        </div>

                        <div className="md:flex md:justify-between md:items-center mb-2">

                            <p
                                className = "mr-2 md:mr-0 mb-2 md:mb-0 text-white"
                            >
                                { current.opponent2.name }
                            </p>

                            <input 
                                className = "appearance-none py-1 rounded px-4 focus:outline-none w-24 md:w-auto w-full"
                                type="number" 
                                name= { current.opponent2.id } 
                                id= { current.opponent2.id }
                                min = "0"
                                onChange = { e => setScoreB( e.target.value ) }
                                value = { `${ scoreB }` } 
                            />


                        </div>

                        { !current.closed && (

                            <button
                                className = "bg-yellow-700 transition delay-75 duration-300 ease-in-out delay hover:bg-yellow-800 text-gray-200 py-2 px-4 rounded text-center my-4 md:mb-0 w-full mt-4"
                                onClick = { gameFinished }
                            >
                                Actualizar 
                            </button>

                        )}


                    </div>
                    
                </Modal>
            )}

        </>

    );
}
 
export default Draws;