import React, { FC, useEffect, useContext, useState } from 'react'
import Swal from 'sweetalert2'
import Draws from '../components/Draws'

// Componentes
import Layout from '../components/Layout'
import Participants from '../components/Participants'

// Context
import EliminationContext from '../context/elimination/EliminationContext'

// Models
import { Player } from '../models'

const Elimination: FC = () => {

    const { 
        matches, 
        remainingMatches,
        addPlayer, 
        fetchMatches,  
        deleteTournament,
        nextRound
    } = useContext( EliminationContext )

    useEffect(() => {
        
        if( matches.length === 0 ) fetchMatches()

    }, [])

    useEffect(() => {
        
        if( remainingMatches === 0 )
            nextRound()

    }, [remainingMatches])

    const cancelTournament = async () => {
        
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            icon: 'warning',
            text: "Esta acción no se puede deshacer",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        })

        if( result.isConfirmed ) {

            deleteTournament()

        }

    }

    return ( 
        <Layout
            addAction = { (item: Player) => addPlayer( item ) }
            cancelTournament = { cancelTournament }
        >

            <h1
                className = "text-center text-xl text-white pt-10 font-bold"
            >
                Eliminación directa
            </h1> 

            <div className="mt-8 w-11/12 mx-auto md:w-full overflow-x-scroll">

                { matches.length === 0 ? (

                    <Participants />

                ) : (

                    <Draws />

                )}


            </div>

            

        </Layout>   
    );
}
 
export default Elimination;