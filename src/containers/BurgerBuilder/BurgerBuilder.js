import React, { Component } from 'react';
import Aux from '../../hoc/Auxy'
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    };
    render() {
        return (
            <Auxy>
                <Burger ingredients={this.state.ingredients} />
                <h1>Burger controls</h1>
            </Auxy>
        );
    }
}

export default BurgerBuilder;