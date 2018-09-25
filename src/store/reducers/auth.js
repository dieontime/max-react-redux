import actions from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    userId: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                userId: action.payload.userId
            };
        case actions.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default reducer;