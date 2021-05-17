
interface Action {
    type: string,
    payload: any
}

export default ( state: any, action: Action ) : any => {

    switch (action.payload) {
        default: return state
    }

}
