import React, { FC, useEffect, useContext, useState } from 'react'

// Models
import { Player, Match } from "../../models";

// Context
import WorldContext from '../../context/world/WorldContext'

// Componentes
import Matches from './Matches';

const MatchList: FC = () => {

    const { matches, semiCounter, calcuteMatchForFinal } = useContext( WorldContext )

    useEffect(() => {

        if( semiCounter === 2 )
            calcuteMatchForFinal()
        
    }, [semiCounter])

    return ( 

        <>
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
        </>

    );
}
 
export default MatchList;