import React from 'react';
import classes from './burgerControl'
const burgerControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.More}>+</button>
            <button className={classes.Less}>-</button>
        </div>
    );
}

export default burgerControl;