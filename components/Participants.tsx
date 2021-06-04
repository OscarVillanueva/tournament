import React, { FC, useContext, useEffect } from 'react'
import Swal from 'sweetalert2'

// Context
import EliminationContext from '../context/elimination/EliminationContext'

// Model
import { Player } from '../models'

export interface ParticipantsProps {
    
}
 
const Participants: FC<ParticipantsProps> = () => {

    const { ranking, fetchRankig, deletePlayer, generateMatches } = useContext( EliminationContext )

    useEffect(() => {

        if( ranking.length === 0 )
            fetchRankig()
        
    }, [])

    const handleDeletePlayer = async (player: Player) => {
        
        
        const response = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ¡Borrar!'
        })

        if( response.isConfirmed ) {

           deletePlayer( player )
            
        }
    

    }

    return ( 

        <div>

                <h3 className = "text-center text-white text-lg mt-8 md:mt-0">
                    Participantes
                </h3>

                {ranking.map( (player: Player) => (
                    
                    <div
                        key = { player.id }
                        className = "flex justify-between items-center mt-2 border-b-2 border-yellow-400 p-2"
                    >
                        <p
                            className = "text-gray-100"
                        >
                            { player.name }
                        </p>

                        <button
                            onClick = { () => handleDeletePlayer( player ) }
                            className = "text-red-400"
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>

                        </button>
                    </div>

                ))}

                { ranking.length > 7 && (

                    <button
                        onClick = { () => generateMatches() }
                        className = "text-center text-white text-sm w-full mt-4"
                    >
                        Cerrar torneo / No admitir más jugadores
                    </button>

                )}

        </div>
        
    );
}
 
export default Participants;