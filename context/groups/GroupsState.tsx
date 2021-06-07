import React, { FC, useReducer } from 'react'
import shortid from 'shortid'

// Context y Reducer
import GroupsContext from './GroupsContext'
import GroupsReducer from './GroupsReducer'

import { Player, Group } from "../../models";
import { SET_GROUPS } from '../../types';

const GroupsState: FC = ({ children }) => {

    const initialState = {
        groups: []
    }

    const [ state, dispatch ] = useReducer( GroupsReducer, initialState )

    const addPlayer = ( player: Player ) => {
        
        const bridge = [ ...state.groups ]

        // Primero buscamos si un grupo esta incompleto
        const group = bridge.findIndex( ( g: Group ) => g.players.length < 4 )

        console.log(`group`, group)

        if( group >= 0) bridge[ group ].players.push( player )

        else {

            // Si esta incompleto agregamos si no creamos otro grupo
            const newGroup: Group = {
                id: shortid.generate(),
                name: `Grupo ${ bridge.length + 1 }`,
                players: [ player ]
            }

            bridge.push( newGroup )

        }

        // Agregamos al state y al storage
        dispatch({
            type: SET_GROUPS,
            payload: bridge
        })

    }

    return ( 

        <GroupsContext.Provider
            value = {{
                groups: state.groups,
                addPlayer
            }}
        >

            { children }

        </GroupsContext.Provider>

    );
}
 
export default GroupsState;