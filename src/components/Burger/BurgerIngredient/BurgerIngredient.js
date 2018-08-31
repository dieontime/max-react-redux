import React, { Component } from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';
import INGREDIENT_TYPE from '../BurgerIngredientTypes';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case INGREDIENT_TYPE.BREAD_BOTTOM:
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case INGREDIENT_TYPE.BREAD_TOP:
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case INGREDIENT_TYPE.MEAT:
                ingredient = <div className={classes.Meat}></div>;
                break;
            case INGREDIENT_TYPE.SALAD:
                ingredient = <div className={classes.Salad}></div>;
                break;
            case INGREDIENT_TYPE.CHEESE:
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case INGREDIENT_TYPE.BACON:
                ingredient = <div className={classes.Bacon}></div>;
                break;
            default:
                ingredient = null;
                break;
        }
        return ingredient;
    }

}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};
export default BurgerIngredient;