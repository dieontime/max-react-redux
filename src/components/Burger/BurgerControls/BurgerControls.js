import React from 'react';
import classes from './BurgerControls.css';
import BurgerIngredientTypes from '../BurgerIngredientTypes';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
    { label: "Salad", type: BurgerIngredientTypes.SALAD },
    { label: "Bacon", type: BurgerIngredientTypes.BACON },
    { label: "Cheese", type: BurgerIngredientTypes.CHEESE },
    { label: "Meat", type: BurgerIngredientTypes.MEAT },
];

const burgerControls = (props) => {
    return (
        <div className={classes.BurgerControls}>
            <p>Total Price: $<strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((c) => {
                return <BurgerControl key={c.label} label={c.label}
                    addHandler={() => props.ingredientAdded(c.type)}
                    removeHandler={() => props.ingredientRemoved(c.type)}
                    disableInfo={props.disableInfo[c.type]} />
            })}
            <button onClick={props.onOrder} disabled={!props.purchasable} className={classes.OrderButton}>Order!</button>
        </div>
    );

}

export default burgerControls;