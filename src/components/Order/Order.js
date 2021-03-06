import React from 'react';
import classes from './Order.css';

const order = (props) => {
    console.log(props);
    const ingredients = props.order.ingredients.map(ing => {
        return <span key={ing.name}>{ing.name + ' - ' + ing.amount} </span>
    });
    return (
        <div className={classes.Order}>
            Ingredients: {ingredients}
            <h4>Price: <strong>{'$' + props.order.price}</strong></h4>
            <h5>Purchased on: {props.order.purchaseDate}</h5>
        </div>
    );
}

export default order;