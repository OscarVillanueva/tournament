type Action = {
    type: string,
    payload: any
}

const EliminationReducer = ( state: any, action: Action ) : any => {

    switch (action.type) {
        default: return state
    }

}

export default EliminationReducer