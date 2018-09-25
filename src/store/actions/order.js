import actions from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actions.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData
        }
    }
}

export const purchaseInit = () => {
    return {
        type: actions.PURCHASE_INIT
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actions.PURCHASE_BURGER_FAIL,
        payload: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actions.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            }).catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const fetchOrderStart = () => {
    return {
        type: actions.FETCH_ORDERS_START
    }
}

export const fetchOrderSuccess = (response) => {
    return {
        type: actions.FETCH_ORDERS_SUCCESS,
        payload: response
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actions.FETCH_ORDERS_FAIL,
        payload: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(response => {
                let fetchedOrders = [];
                for (let key in response.data) {
                    let ingredients = [];
                    for (let ing in response.data[key].ingredients) {
                        ingredients.push({
                            name: ing,
                            amount: response.data[key].ingredients[ing]
                        });
                    }
                    response.data[key].ingredients = ingredients;
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrderFail(error));
            })
    }
}