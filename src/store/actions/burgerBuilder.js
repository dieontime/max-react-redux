import actions from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actions.ADD_INGREDIENT,
        payload: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actions.REMOVE_INGREDIENT,
        payload: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actions.SET_INGREDIENTS,
        payload: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actions.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-d9d93.firebaseio.com/Ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    }
}