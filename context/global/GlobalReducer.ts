import { TOURNAMENT_STATUS } from "../../types"

import { Action } from "../../models";

const GlobalReducer = ( state: any, action: Action ) : any => {
    
    switch (action.type) {
        
        case TOURNAMENT_STATUS:
            return {
                ...state,
                open: action.payload
            }
    
        default: return state
    }

}

export default GlobalReducer