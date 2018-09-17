import actions from './actionTypes';

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