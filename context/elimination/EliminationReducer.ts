import { 
    ADD_PLAYER, 
    CLEAR_STATE, 
    DELETE_PLAYER, 
    FETCH_PLAYERS, 
    SET_MATCHES
} from "../../types"

type Action = {
    type: string,
    payload: any
}

const EliminationReducer = ( state: any, action: Action ) : any => {

    switch (action.type) {

        case FETCH_PLAYERS:
        case ADD_PLAYER:
        case DELETE_PLAYER:

            return {
                ...state,
                ranking: action.payload
            }

        case SET_MATCHES: 
            
            return {
                ...state,
                matches: action.payload
            }
            
        case CLEAR_STATE: 

            return {
                ...state, 
                ranking: [],
                matches: []
            }    

        default: return state
    }

}

export default EliminationReducer