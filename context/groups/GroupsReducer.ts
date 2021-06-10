import { Action } from "../../models";
import { FETCH_PLAYERS, SET_GROUPS } from "../../types";

const GroupsReducer = ( state: any, action: Action ) : any => {
    
    switch (action.type) {
        
        case SET_GROUPS: 
            return {
                ...state, 
                groups: action.payload
            }

        default: return state
    }

}

export default GroupsReducer