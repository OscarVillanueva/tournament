import React, { FC, useState, useEffect, useContext } from 'react'

// Models
import { Player, Match, Stage } from "../../models";

// Context
import WorldContext from '../../context/world/WorldContext'
import GlobalContext from '../../context/global/GlobalContext'

// Componentes
import Ranking from './Ranking';

const RankingContainer: FC = () => {

    const [nextRound, setNextRound] = useState(false)

    const { matches, ranking, calcuteMatchesForSemis } = useContext( WorldContext )
    const { changeTournamentStatus } = useContext( GlobalContext )

    useEffect(() => {

        if( matches.length > 0 ) {

            const flag = !matches.some( (match: Match) => match.stage === Stage.semis )
    
            if( !matches.some( (match: Match) => !match.closed ) && flag && matches.length > 6 )
                setNextRound( true )

            changeTournamentStatus( false )

        }
        else setNextRound( false )

        
    }, [matches])

    const handleSemis = () => {
        
        calcuteMatchesForSemis()
        setNextRound( false )

    }

    return ( 

        <>
        
            <h3 className = "text-center text-white text-lg mt-8 md:mt-0">
                Ranking
            </h3>

            <Ranking 
                ranking = { ranking }
            />

            { nextRound && (

                <button
                    onClick = { handleSemis }
                    className = "text-white text-sm mt-2 text-center w-full"
                >
                    Jugar una semifinal 
                </button>

            )}

        </>

    );
}
 
export default RankingContainer;