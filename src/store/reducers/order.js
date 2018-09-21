import actions from '../actions/actionTypes';

const initialState = {
    loading: false,
    orders: [],
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actions.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actions.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                order: state.order.concat(newOrder)
            };
        case actions.PURCHASE_BURGER_FAIL:
        alert('failed');
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;