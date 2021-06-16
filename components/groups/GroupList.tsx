import React, { FC, useContext, useState, useEffect } from 'react'

// Models
import useDragAndDrop from "../../hooks/useDragAndDrop";

// Context
import GroupsContext from '../../context/groups/GroupsContext'
import GlobalContext from '../../context/global/GlobalContext'

// Componentes
import TableGroup from './TableGroup';
import { Group } from '../../models';

export interface GroupListProps {
}
 
const GroupList: FC<GroupListProps> = () => {

    const { matches, groups, exchangePlayers, startTournament } = useContext( GroupsContext )
    const { changeTournamentStatus } = useContext( GlobalContext )
    const [isAvailableToClose, setIsAvailableToClose] = useState(false)

    useEffect(() => {    
    
        if( groups.length >= 2 && groups.every( ( g: Group ) => g.players.length === 4 ) 
            && matches.length === 0) {

            setIsAvailableToClose( true )
            changeTournamentStatus( true )
            
        }
        
        else {

            changeTournamentStatus( false )
            setIsAvailableToClose( false )

        }

    }, [groups, matches])

    const { dragDstEl, dragSrcEl, events } = useDragAndDrop({
        startCallback: () => {},
        endCallback: () => {},
        dropCallback: handleActionOnDrop
    })

    function handleActionOnDrop() {
        
        if( dragDstEl.stage !== dragSrcEl.stage )
            exchangePlayers( dragSrcEl, dragDstEl )

    }

    return ( 

        <div>

            <h1
                className = "text-center text-xl text-white pt-2 mb:pt-10 font-bold"
            >
                Grupos
            </h1> 

            <div 
                className={
                    `md:grid ${matches.length === 0 && "md:grid-cols-2"} 
                    pt-8 gap-8 w-11/12 mx-auto md:w-full`
                }
            >

                {groups.map( group => (
            
                    <TableGroup
                        events = { events }
                        key = { group.id }
                        group = { group }
                    />
                    
                ))}

            </div>

            { isAvailableToClose && (

                <button
                    className = "text-white text-center text-sm w-full mt-10"
                    onClick = { startTournament }
                >
                    Cerrar torneo / No admitir más jugadores 
                </button>

            )}


        </div>

    );
}
 
export default GroupList;