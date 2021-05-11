import React, { FC } from 'react'
import Link from 'next/link'

export interface NavigationProps {
    
}
 
const Navigation: FC<NavigationProps> = () => {
    return ( 

        <header className = "bg-green-800 flex justify-between p-4">

            <Link href = "/">

                <a className = "text-white uppercase text-bold text-lg">
                    Regresar
                </a>

            </Link>

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