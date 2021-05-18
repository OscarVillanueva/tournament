// Tipos - actions
import { ADD_PLAYER, DELETE_PLAYER, FETCH_PLAYERS, SET_ERROR } from "../../types"

// Models
import { Player } from "../../models/index";

type Action = {
    type: string,
    payload: any
}

const WorldReducer = ( state: any, action: Action ) : any => {

    switch (action.type) {

        case FETCH_PLAYERS: 

            return {
                ...state,
                ranking: action.payload
            }

        case ADD_PLAYER:

            return {
                ...state,
                operationError: false,
                ranking: [
                    ...state.ranking,
                    {
                        id: state.ranking.length,
                        ...action.payload
                    }
                ]
            }

        case DELETE_PLAYER: 

            console.log("Me llame al borrar", action.payload)

            return {
                ...state,
                operationError: false,
                ranking: state.ranking.filter( (i : Player) => i.id !== action.payload.id )
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
