import React, { FC } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { Player } from '../models'

export interface NavigationProps {
    addAction?: Function
}
 
const Navigation: FC<NavigationProps> = ({ addAction }) => {

    const addToTournament = async () => {

        const result = await Swal.fire({
            title: "Agregar nuevo participante",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Agregar",
            confirmButtonColor: "#d97706"
        })

        if( result.isConfirmed ) {
            
            const participant: Player = {
                name: result.value,
                victories: 0,
                score: 0
            }

            addAction( participant )

        }

    }

    return ( 

        <header className = "bg-green-800 flex flex-col md:flex-row md:justify-between p-4 items-center">

            <Link href = "/">

                <a 
                    className = "text-white uppercase text-bold text-lg hover:text-gray-200 text-right md:text-left"
                >
                    Regresar
                </a>

            </Link>

            <button
                className = "bg-yellow-700 transition delay-75 duration-300 ease-in-out delay hover:bg-yellow-800 text-gray-200 py-2 px-4 rounded text-center my-4 md:my-0 md:mb-0"
                onClick = { addToTournament }
            >
                Agregar parcipante
            </button>

            <button
                className = "bg-red-700 transition delay-75 duration-300 ease-in-out delay hover:bg-red-800 text-gray-200 py-2 px-4 rounded text-center"
                onClick = { () => console.log("Eliminando de la base de datos") }
            >
                Cancelar torneo
            </button>


        </header>

    );
}
 
export default Navigation;