import React, { FC, useReducer } from 'react'

import GroupsContext from './GroupsContext'
import GroupsReducer from './GroupsReducer'

const GroupsState: FC = ({ children }) => {
    return ( 

        <GroupsContext.Provider
            value = {{}}
        >

            { children }

        </GroupsContext.Provider>

    );
}
 
export default GroupsState;