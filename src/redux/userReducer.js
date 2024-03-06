const initialState = {
    user:{}
}

export const userReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "Login_Success":
            return {
                ...state, user:action.payload
            }
            case "Login_Error":
                return initialState
        default:
            return initialState
    }
}