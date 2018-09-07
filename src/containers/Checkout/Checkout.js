import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    };

    componentDidMount() {
        const stateParam = this.props.history.location.state
        this.setState({
            ingredients: stateParam.ingredients,
            price: stateParam.price
        });
    }
    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }
    continueCheckoutHandler = () => {
        this.props.history.push('/checkout/contact-data', {
            ingredients: this.state.ingredients,
            price: this.state.price
        });
    }
    render() {
        const checkout = this.state.ingredients ? <CheckoutSummary
            ingredients={this.state.ingredients}
            cancelCheckout={this.cancelCheckoutHandler}
            continueCheckout={this.continueCheckoutHandler}></CheckoutSummary>
            : <Spinner />
        return (
            <div>
                {checkout}
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

export default Checkout;