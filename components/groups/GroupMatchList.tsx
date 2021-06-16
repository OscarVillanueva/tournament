import React, { FC, useContext } from 'react'

// Models
import { Match } from '../../models'

// Context
import GroupsContext from '../../context/groups/GroupsContext'

// Componentes
import GroupMatch from '../../components/groups/GroupMatch'
 
const GroupMatchList: FC = () => {

    const { matches } = useContext( GroupsContext )

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