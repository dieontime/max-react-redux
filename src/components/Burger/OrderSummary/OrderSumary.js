import React from 'react';
import Auxy from '../../../hoc/Auxy';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span>{key}</span>: {props.ingredients[key]}
                </li>
            );
        });
    return (
        <Auxy>
            <h3>Your Order</h3>
            <p>Ingredients you ordered</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:$ {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" onClicked={props.onPurchaseCancel}>Cancel</Button>
            <Button btnType="Success" onClicked={props.onPurchaseContinue}>Continue</Button>
        </Auxy>
    )
};

export default orderSummary;