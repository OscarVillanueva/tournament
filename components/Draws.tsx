import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Modal } from '@material-ui/core'

// Context
import EliminationContext from '../context/elimination/EliminationContext'

export interface DrawsProps {
    
}
 
const Draws: FC<DrawsProps> = () => {

    const {  ranking, matches, config, updateScore } = useContext( EliminationContext )
    const [current, setCurrent] = useState( null )
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        
        if( typeof window !== "undefined" && matches.length > 0 ) {

            generateBrackets()

        }

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
                    
                    let target = e.target

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

    const handleChange = (e: ChangeEvent) => {
        
        if( e.target.value.trim() !== "" )

            if( current.opponent1.id === e.target.id )
                setCurrent({
                    ...current,
                    opponent1: {
                        ...current.opponent1,
                        score: e.target.value
                    }
                })

            else
                setCurrent({
                    ...current,
                    opponent2: {
                        ...current.opponent2,
                        score: e.target.value
                    }
                })

    }
    
    const gameFinished = () => {
        
        const matchFinished = {
            ...current,
            closed: true,
            opponent1: {
                ...current.opponent1,
                result: current.opponent1.score > current.opponent2.score ? "win" : "loss"
            },
            opponent2: {
                ...current.opponent2,
                result: current.opponent1.score > current.opponent2.score ? "loss" : "win"
            }
        }   

        updateScore( matchFinished )
        setIsOpen( false )

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
                                onChange = { e => handleChange( e ) }
                                value = { `${ current.opponent1.score }` } 
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
                                onChange = { e => handleChange( e ) }
                                value = { `${ current.opponent2.score }` } 
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