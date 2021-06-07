import React,{ FC, useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

// Models
import { Player, Match, Stage } from "../models/index";

// Componentes
import Layout from '../components/layout/Layout'
import Matches from '../components/world/Matches'
import Ranking from '../components/world/Ranking'

// Context
import WorldContext from '../context/world/WorldContext'
import GlobalContext from '../context/global/GlobalContext'
import RankingContainer from '../components/world/RankingContainer';
import MatchList from '../components/world/MatchList';

const World: FC = () => {
    
    const { changeTournamentStatus } = useContext( GlobalContext )

    const { 
        ranking, 
        matches,
        fetchRankig, 
        fetchMatches,
        addPlayer,
        deleteTournament,
    } = useContext( WorldContext )

    useEffect(() => {
        
        if( ranking.length === 0 ) 
            fetchRankig()

        if( matches.length === 0 ) 
            fetchMatches()

    }, [])

    const addPlayerToTournamet = (player: Player) => addPlayer( player )

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
            changeTournamentStatus( true )

        }

    }

    return (

        <Layout
            addAction = { (item: Player) => addPlayerToTournamet( item ) }
            cancelTournament = { cancelTournament }
        >

            <h1
                className = "text-center text-white text-3xl md:pt-8"
            >
                Todos contra todos
            </h1>

            <div className="md:grid md:grid-cols-2 mt-8 gap-8 w-11/12 mx-auto md:w-full">

                <div>

                    <MatchList />

                </div>
                
                <div>

                    <RankingContainer />

                </div>

            </div>
            
        </Layout>
    );
}
 
export default World;