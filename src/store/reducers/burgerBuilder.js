import Actions from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        meat: 1,
        cheese: 0,
        bacon: 0
    },
    totalPrice: 4,
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
        default:
            return state;
    }
};

export default reducer;