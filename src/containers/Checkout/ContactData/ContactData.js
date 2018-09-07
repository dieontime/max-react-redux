import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: 0,
            country: ''
        },
        deliveryMethod: '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const stateParam = this.props.history.location.state
        const ingredients = stateParam.ingredients;
        const price = stateParam.price;
        this.setState({ loading: true });
        const order = {
            ingredients: ingredients,
            price: price,
            customer: {
                name: 'Custo',
                email: 'custo.gusto@ascensio.com',
                address: {
                    street: 'Silent valley',
                    zip: 682030,
                    country: "INDIA"
                },
                deliveryMethod: 'fastest'
            }
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(error => {
                this.setState({ loading: false });
            });
    }
    render() {
        let form = (
            <div>
                <h3>Contact Details</h3>
                <form>
                    <Input type="text" name="name" label="Name" placeholder="Name" />
                    <Input type="email" name="email" label="Email" placeholder="Email" />
                    <Input type="text" name="street" label="Street" placeholder="Street" />
                    <Input type="text" name="zip" label="Zip" placeholder="Zip" />
                    <Input type="text" name="country" label="Country" placeholder="Country" />
                    <Button btnType="Success" onClicked={this.orderHandler}>Order</Button>
                </form>
            </div>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default ContactData;