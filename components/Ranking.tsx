import React, { FC, useContext, useState, useEffect} from 'react'
import styled from 'styled-components'

// Models
import { Player } from "../models/index";

// Context
import WorldContext from '../context/world/WorldContext'
import Swal from 'sweetalert2';

const Row = styled.tr`
    border-bottom: 1px solid#d97706;

    td {

        padding: 0.6rem;

    }
`

export interface RankingProps {
    ranking: Player[]
}

const Ranking: FC<RankingProps> = ({ ranking }) => {

    const [isClose, setIsClose] = useState(false)
    const [started, setStarted] = useState(false)

    const { matches, deletePlayer, generateSchedule } = useContext( WorldContext )

    useEffect(() => {
        
        if( !ranking || ranking.length < 3 || matches.length === 0 ) {
            
            setIsClose( false )
            setStarted( false )
            
        }
        
        else {
            
            setStarted( true )
            setIsClose( true )

        }

    }, [ranking])

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

        if( response.isConfirmed ) deletePlayer( player )

    }

    const handleStartTournament = () => {
        
        setStarted( true )
        setIsClose( true )
        generateSchedule()

    }

    return ( 
        <table className = "w-full mt-4 border border-yellow-600 rounded">

            <thead className = "bg-yellow-600">

                <tr>
                    <th className = "text-center text-white">
                        Posición
                    </th>

                    <th className = "text-center text-white">
                        Participante
                    </th>

                    <th className = "text-center text-white">
                        Victorias
                    </th>

                    <th className = "text-center text-white">
                        Puntos
                    </th>

                    { !started && (

                        <th className = "text-center text-white">
                            Eliminar
                        </th>

                    )}

                </tr>

            </thead>

            <tbody>

                {ranking.map((player, index) => (
                    
                    <Row
                        key = { index }
                    >

                        <td className = "text-center text-white">{ index + 1 }</td>
                        <td className = "text-center text-white">{ player.name }</td>
                        <td className = "text-center text-white">{ player.victories }</td>
                        <td className = "text-center text-white">{ player.score }</td>

                        { !started && (

                            <td className = "text-center text-red-400">


                                <button
                                    onClick = { () => handleDeletePlayer( player ) }
                                >

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>

                                </button>



                            </td>

                        )}


                    </Row>

                ))}

                
            </tbody>

            { !isClose && (

                <tfoot>

                    <tr>
                        <td 
                            colSpan = { 5 }
                            className = "text-center text-white text-sm py-2"
                        >
                            <button
                                onClick = { handleStartTournament }
                            >
                                Cerrar torneo / No admitir más jugadores
                            </button>
                        </td>
                    </tr>

                </tfoot>

            )}

        </table>

    );
}
 
export default Ranking;