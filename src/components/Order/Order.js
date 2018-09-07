import React from 'react';
import classes from './Order.css';

const order = (props) => {
    console.log(props.order.ingredients);
    const ingredients = props.order.ingredients.map(ing => {
        return <span key={ing.name}>{ing.name + ' - ' + ing.amount} </span>
    });
    return (
        <div className={classes.Order}>
            Ingredients: {ingredients}
            <h4>Price: <strong>{'$' + props.order.price}</strong></h4>
        </div>
    );
}

export default order;