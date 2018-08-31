import React, { Component } from 'react';
import Auxy from '../../hoc/Auxy'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumary';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 1,
    cheese: 0.5,
    meat: 1.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => { return ingredients[key] })
            .reduce((sum, e) => { return sum + e }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredient = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updatedCount = oldIngredientCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + priceAddition;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredient = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if (oldIngredientCount <= 0) {
            return;
        }
        const updatedCount = oldIngredientCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice - priceDeduction;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchasable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        alert('done!');
        this.setState({ purchasing: false });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Auxy>
                <Modal show={this.state.purchasing} onModalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        show={this.state.purchasing}
                        ingredients={this.state.ingredients}
                        onPurchaseCancel={this.purchaseCancelHandler}
                        onPurchaseContinue={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    disableInfo={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    onOrder={this.purchaseHandler} />
            </Auxy>
        );
    }
}

export default BurgerBuilder;