import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
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
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                });
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }
    render() {
        let orders = <Spinner />;
        if (this.state.orders.length > 0) {
            orders = this.state.orders.map(ord => {
                return <Order order={ord} key={ord.id} />;
            })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default Orders;