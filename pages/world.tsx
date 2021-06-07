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

const World: FC = () => {

    
    const [addingPlayer, setAddingPlayer] = useState(false)

    const { changeTournamentStatus } = useContext( GlobalContext )

    const { 
        ranking, 
        matches,
        operationError, 
        semiCounter,
        fetchRankig, 
        fetchMatches,
        addPlayer,
        deleteTournament,
        calcuteMatchForFinal
    } = useContext( WorldContext )

    useEffect(() => {
        
        if( ranking.length === 0 ) 
            fetchRankig()

        if( matches.length === 0 ) 
            fetchMatches()

    }, [])

    useEffect(() => {
        
        if( addingPlayer )
            error()

    }, [operationError])

    useEffect(() => {

        if( semiCounter === 2 )
            calcuteMatchForFinal()
        
    }, [semiCounter])

    const error = () => {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un error intenta más tarde',
        })

        setAddingPlayer( false )
        
    }

    const addPlayerToTournamet = (player: Player) => {
        
        setAddingPlayer( true )

        addPlayer( player )

    }

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
                    <h3 className = "text-center text-white text-lg mb-4">
                        Rol
                    </h3>

                    <div className="max-h-100 overflow-y-scroll">

                        {matches.map(( game: Match ) => (
                        
                            <Matches
                                key = { game.id }
                                round = { game.round }
                                participants = { game }
                                closed = { game.closed }
                            />
                        ))}

                    </div>


                </div>
                
                <div>

                    <RankingContainer />

                </div>

            </div>
            
        </Layout>
    );
}
 
export default World;