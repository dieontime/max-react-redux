import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.Summary}>
            <h1>Order Confirmation</h1>
            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                onClicked={props.cancelCheckout}>Cancel</Button>
            <Button
                btnType="Success"
                onClicked={props.continueCheckout}>Continue</Button>
        </div>
    );
};

export default checkoutSummary;