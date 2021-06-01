import React, { FC, useReducer } from 'react'
import shortid from 'shortid'
import EliminationContext from './EliminationContext'
import EliminationReducer from './EliminationReducer'

// Hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// Models
import { Player, Match } from '../../models'

// Types
import { 

    ADD_PLAYER

} from "../../types";

const EliminationState: FC = ({ children }) => {

    const initialState = {
        matches: []
    }

    const { getFromStorage, setIntoStorage, clearStorage } = useLocalStorage( "world" )

    const [ state, dispatch ] = useReducer( EliminationReducer, initialState )

    const addPlayer = (player: Player) => {

        try {
            
            const newPlayer = {
                ...player,
                id: shortid.generate()
            }

            const data = [ ...state.ranking, newPlayer ]

            setIntoStorage( "ranking", data )

            dispatch({
                type: ADD_PLAYER,
                payload: data
            })  

        } catch (error) {

            console.log(error)
            
        }

    }

    return ( 

       <EliminationContext.Provider
            value = {{
                matches: state.matches,
                ranking: state.ranking,
                addPlayer
            }}
       >
           { children }
       </EliminationContext.Provider>

    );
}
 
export default EliminationState;