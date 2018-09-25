import Actions from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 1,
    cheese: 0.5,
    meat: 1.5,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
            };
        case Actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
            };
        case Actions.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
                totalPrice: 4,
                error: true
            };
        case Actions.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;