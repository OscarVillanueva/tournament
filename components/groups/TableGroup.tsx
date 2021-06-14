import React, { FC } from 'react'

// Modelos
import { Group } from '../../models';

export interface TableGroupProps {
    
    group: Group

}
 
const TableGroup: FC <TableGroupProps> = ({ group }) => {

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
                            <th className = "text-center text-white">
                                Eliminar
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        { group.players.map(( player, index ) => (
                
                            <tr
                                key = { player.id }
                                draggable
                            >
                                <td className = "text-center text-white">
                                    { index + 1 }
                                </td>

                                <td className = "text-center text-white">
                                    { player.name }
                                </td>

                                <td className = "text-center text-white">
                                    { player.victories }
                                </td>

                                <td className = "text-center text-white">
                                    { player.defeats }
                                </td>

                                <td className = "text-center text-white">
                                    { player.score }
                                </td>

                                <td className = "text-center text-red-400">
                                    <button
                                        // onClick = { () => handleDeletePlayer( player ) }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>

                            </tr>
                        )) }

                    </tbody>

                </table>

            </div>

        </div>

    );

}
 
export default TableGroup;