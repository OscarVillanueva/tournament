import React, { FC, useContext, useEffect, useState } from 'react'
import { Modal } from '@material-ui/core'

// Context
import EliminationContext from '../context/elimination/EliminationContext'

export interface DrawsProps {
    
}
 
const Draws: FC<DrawsProps> = () => {

    const {  ranking, matches, config, fetchMatches } = useContext( EliminationContext )
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

                    setCurrent( bridge )
                    setIsOpen( true )

                })

            })
            
            
        } catch (error) {
            console.log(error)
        }
        

    }

    return ( 

        <>

            <div id="example" className = "bracket-viewer"></div>

            <Modal
                className = "flex items-center justify-center"
                open = { isOpen }
                onClose = { () => setIsOpen( false ) }
            >
                
                <div className="bg-gray-300 w-3/5 p-10 rounded">

                    <h1>Hola</h1>

                </div>
                
            </Modal>

        </>

    );
}
 
export default Draws;