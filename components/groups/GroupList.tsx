import React, { FC, useContext } from 'react'

// Models
import useDragAndDrop from "../../hooks/useDragAndDrop";

// Context
import GroupsContext from '../../context/groups/GroupsContext'

// Componentes
import TableGroup from './TableGroup';

export interface GroupListProps {
}
 
const GroupList: FC<GroupListProps> = () => {

    const { groups, exchangePlayers } = useContext( GroupsContext )

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

            <div className="md:grid md:grid-cols-2 pt-8 gap-8 w-11/12 mx-auto md:w-full">

                {groups.map( group => (
            
                    <TableGroup
                        events = { events }
                        key = { group.id }
                        group = { group }
                    />
                    
                ))}

            </div>
        </div>

    );
}
 
export default GroupList;