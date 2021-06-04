import React, { FC, useReducer } from 'react'
import { TOURNAMENT_STATUS } from '../../types'
import GlobalContext from './GlobalContext'
import GlobalReducer from './GlobalReducer'
 
const GlobalState: FC = ({ children }) => {

    const initialState = {
        open: true
    }

    const [ state, dispatch ] = useReducer( GlobalReducer, initialState)

    const changeTournamentStatus = ( status: boolean ) => {
        
        dispatch({ 
            type: TOURNAMENT_STATUS,
            payload: status
        })

    }

    return ( 

        <GlobalContext.Provider
            value = {{
                open: state.open,
                changeTournamentStatus
            }}
        >
            {children}
        </GlobalContext.Provider>

    );
}
 
export default GlobalState;