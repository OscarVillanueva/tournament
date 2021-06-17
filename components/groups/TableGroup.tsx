import React, { FC, useContext } from 'react'

// Context
import GroupsContext from '../../context/groups/GroupsContext'

// Modelos
import { Group } from '../../models';
import { Events } from "../../hooks/useDragAndDrop";
import Swal from 'sweetalert2';

export interface TableGroupProps {
    
    group: Group,
    events: Events

}
 
const TableGroup: FC <TableGroupProps> = ({ group, events }) => {

    const { 
        handleDragStart, 
        handleDragEnd, 
        handleDragEnter, 
        handleDragLeave, 
        handleDragOver, 
        handleDrop 
    } = events

    const { matches, deletePlayer } = useContext( GroupsContext )

    const handleDeletePlayer = async ( id: string, group: string ) => {
        
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

            deletePlayer( id, group )

        }

    }

    return ( 

        <div
            className = "border rounded p-8 mb-4 md:mb-0"
        >

            <h4
                className = "text-white text-center border-b-2 mb-4"
            >
                { group.name }
            </h4>

            <div className = "overflow-scroll">

                <table className = "w-full mt-4">

                    <thead>

                        <tr>
                            <th className = "text-center text-white pr-2">
                                Posición
                            </th>
                            <th className = "text-center text-white pr-2">
                                Participante
                            </th>
                            <th className = "text-center text-white pr-2">
                                Victorias
                            </th>
                            <th className = "text-center text-white pr-2">
                                Derrotas
                            </th>
                            <th className = "text-center text-white pr-2">
                                Puntos
                            </th>

                            { matches.length === 0 && (

                                <th className = "text-center text-white">
                                    Eliminar
                                </th>

                            )}

                        </tr>

                    </thead>

                    <tbody>

                        { group.players.map(( player, index ) => (
                
                            <tr
                                key = { player.id }
                                id = { player.id }
                                data-type = { group.name }
                                draggable = { matches.length === 0 }
                                onDragStart = { handleDragStart }
                                onDragEnd = { handleDragEnd }
                                onDragEnter = { handleDragEnter }
                                onDragLeave = { handleDragLeave }
                                onDragOver = { handleDragOver }
                                onDrop = { handleDrop }
                            >
                                <td className = {`text-center 
                                    ${ !player.tournament_id ? "text-white" : "text-yellow-400"}`}
                                >
                                    { index + 1 }
                                </td>

                                <td className = {`text-center 
                                    ${ !player.tournament_id ? "text-white" : "text-yellow-400"}`}
                                >
                                    { player.name }
                                </td>

                                <td className = {`text-center 
                                    ${ !player.tournament_id ? "text-white" : "text-yellow-400"}`}
                                >
                                    { player.victories }
                                </td>

                                <td className = {`text-center 
                                    ${ !player.tournament_id ? "text-white" : "text-yellow-400"}`}
                                >
                                    { player.defeats }
                                </td>

                                <td className = {`text-center 
                                    ${ !player.tournament_id ? "text-white" : "text-yellow-400"}`}
                                >
                                    { player.score }
                                </td>

                                { matches.length === 0 && (

                                    <td className = "text-center text-red-400">
                                        <button
                                            onClick = { () => handleDeletePlayer( player.id, group.name ) }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>

                                )}


                            </tr>
                        )) }

                    </tbody>

                </table>

            </div>

        </div>

    );

}
 
export default TableGroup;