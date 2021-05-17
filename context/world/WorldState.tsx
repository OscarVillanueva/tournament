import React, { FC, useReducer, Fragment } from 'react';
import WorldReducer from './WorldReducer'
import WorldContext from './WorldContext'

const WorldState: FC = ({ children }) => {

    const initialState = {
        participants: []
    }

    const [ state, dispatch ] = useReducer( WorldReducer, initialState )

    return ( 
        <WorldContext.Provider
            value = {{
                participants: state.participants
            }}
        >

            { children }

        </WorldContext.Provider>
    );
}
 
export default WorldState;