import { Action } from "../../models";
import { CLEAR_STATE, FETCH_PLAYERS, SET_GROUPS } from "../../types";

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
                groups: []
            }

        default: return state
    }

}

export default GroupsReducer