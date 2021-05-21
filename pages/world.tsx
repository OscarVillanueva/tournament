import React,{ FC, useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import shortid from 'shortid'

// Models
import { Player, Match } from "../models/index";

// Componentes
import Layout from '../components/Layout'
import Matches from '../components/Matches'
import Ranking from '../components/Ranking'

// Context
import WorldContext from '../context/world/WorldContext'

const World: FC = () => {

    const [addingPlayer, setAddingPlayer] = useState(false)

    const { 
        ranking, 
        matches,
        operationError, 
        fetchRankig, 
        fetchMatches,
        addPlayer 
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

    return (
        <Layout
            addAction = { (item: Player) => addPlayerToTournamet( item ) }
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

                    {matches.map(( game: Match ) => (
                        
                        <Matches
                            key = { game.id }
                            round = { game.round }
                            participants = { game }
                        />

                    ))}


                </div>
                
                <div>
                    <h3 className = "text-center text-white text-lg mt-8 md:mt-0">
                        Ranking
                    </h3>

                    <Ranking 
                        ranking = { ranking }
                    />
                </div>

            </div>
            
        </Layout>
    );
}
 
export default World;