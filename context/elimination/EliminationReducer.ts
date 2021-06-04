import { 
    ADD_PLAYER, 
    CLEAR_STATE, 
    CLOSE_MATCH, 
    DELETE_PLAYER, 
    FETCH_PLAYERS, 
    INIT_TOURNAMENT, 
    NEXT_ROUND, 
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
                matches: action.payload.matches,
                remainingMatches: action.payload.count
            }

        case INIT_TOURNAMENT: 
            
            return {
                ...state,
                matches: action.payload.matches,
                remainingMatches: action.payload.count,
                currentRound: action.payload.currentRound
            }

        case CLOSE_MATCH: 

            return {
                ...state, 
                matches: action.payload,
                remainingMatches: state.remainingMatches - 1
            }

        case NEXT_ROUND:

            return {
                ...state,
                matches: action.payload.matches,
                remainingMatches: action.payload.count,
                currentRound: state.currentRound + 1
            }
            
        case CLEAR_STATE: 

            return {
                ...state, 
                ranking: [],
                matches: [],
                remainingMatches: -1,
                currentRound: 0
            }    

        default: return state
    }

}

export default EliminationReducer