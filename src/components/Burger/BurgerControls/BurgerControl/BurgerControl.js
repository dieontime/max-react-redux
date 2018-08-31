import React from 'react';
import classes from './BurgerControl.css';
const burgerControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button onClick={props.addHandler} className={classes.More}>+</button>
            <button disabled={props.disableInfo} onClick={props.removeHandler} className={classes.Less}>-</button>
        </div>
    );
}

export default burgerControl;