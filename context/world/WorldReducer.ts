// Tipos - actions
import { ADD_PLAYER, DELETE_PLAYER, FETCH_PLAYERS, SET_ERROR, SET_MATCHES, UPDATE_PLAYER } from "../../types"


type Action = {
    type: string,
    payload: any
}

const WorldReducer = ( state: any, action: Action ) : any => {

    switch (action.type) {

        case FETCH_PLAYERS: 
        case ADD_PLAYER:
        case DELETE_PLAYER: 
        case UPDATE_PLAYER: 

            return {
                ...state,
                operationError: false,
                ranking: action.payload
            }

        case SET_MATCHES: 
            
            return {
                ...state,
                operationError: false,
                matches: action.payload
            }

        case SET_ERROR: 
            
            return {
                ...state,
                operationError: action.payload
            }

        default: return state
    }

}

export default  WorldReducer
