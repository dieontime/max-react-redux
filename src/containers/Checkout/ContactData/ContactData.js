import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                shouldValidate: false,
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        loading: false,
        formValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const ingredients = this.props.ingredients;
        const price = this.props.price;
        this.setState({ loading: true });
        const formData = {};
        for (let formEl in this.state.orderForm) {
            formData[formEl] = this.state.orderForm[formEl].value;
        }
        const order = {
            ingredients: ingredients,
            price: price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(error => {
                this.setState({ loading: false });
            });
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formValid: formIsValid });
    }
    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            const element = this.state.orderForm[key];
            formElementsArray.push(
                <Input
                    key={key}
                    elementType={element.elementType}
                    elementConfig={element.elementConfig}
                    value={element.value}
                    invalid={element.touched && !element.valid}
                    changed={(event) => this.inputChangeHandler(event, key)}
                    shouldValidate={element.validation} />
            );
        }

        let form = (
            <div>
                <h3>Contact Details</h3>
                <form onSubmit={this.orderHandler}>
                    {formElementsArray}
                    <Button btnType="Success" disabled={!this.state.formValid}>Order</Button>
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);