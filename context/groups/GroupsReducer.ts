import { Action } from "../../models";
import { 
    CLEAR_STATE, 
    FETCH_PLAYERS, 
    SET_GROUPS, 
    SET_MATCHES, 
    SET_NEXT_ROUND_INDEX
} from "../../types";

const GroupsReducer = ( state: any, action: Action ) : any => {
    
    switch (action.type) {
        
        case SET_GROUPS: 
            return {
                ...state, 
                groups: action.payload
            }

        case CLEAR_STATE:
            return {
                ...state,
                groups: [],
                matches: []
            }

        case SET_MATCHES:
            return {
                ...state,
                matches: action.payload
            }

        case SET_NEXT_ROUND_INDEX: 
            return {
                ...state,
                nextRoundIndex: action.payload
            }

        default: return state
    }

}

export default GroupsReducer