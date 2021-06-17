import React, { FC, useContext, useEffect, useState } from 'react'

// Models
import { Match, Stage } from '../../models'

// Context
import GroupsContext from '../../context/groups/GroupsContext'

// Componentes
import GroupMatch from '../../components/groups/GroupMatch'
 
const GroupMatchList: FC = () => {

    const { matches, eliminationRound, getNextRound } = useContext( GroupsContext )

    useEffect(() => {
        
        if( !matches.some( (match: Match) => !match.closed ) ) {

            if ( !matches.find( (match: Match) => match.stage === Stage.final  ) )

                if( matches[ matches.length - 1 ].stage === Stage.regular )
                    eliminationRound()

                else {
                    // debugger
                    getNextRound()
                }

        }

    }, [matches])

    return ( 

        <>
            <h3 className = "text-center text-white text-lg mb-4">
                Rol
            </h3>

            <div className="max-h-100 overflow-y-scroll">

                {matches.map(( game: Match ) => (
                
                    <GroupMatch
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
 
export default GroupMatchList;