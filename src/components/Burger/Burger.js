import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import BurgerIngredientTypes from './BurgerIngredientTypes';

const burger = (props) => {
    let rqIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((e, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (rqIngredients.length === 0) {
        rqIngredients= <p>Please start adding some ingredients!! :)</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={BurgerIngredientTypes.BREAD_TOP} />
            {rqIngredients}
            <BurgerIngredient type={BurgerIngredientTypes.BREAD_BOTTOM} />
        </div>
    );
}

export default burger;