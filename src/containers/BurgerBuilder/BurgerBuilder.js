import React, { Component } from 'react';
import Auxy from '../../hoc/Auxy'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => { return ingredients[key] })
            .reduce((sum, e) => { return sum + e }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        let burgerLayout = this.props.error ? <h2> Error loading ingredients!!</h2> : <Spinner />;
        let orderSummary = null;

        if (this.props.ingredients) {
            const disabledInfo = { ...this.props.ingredients };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            orderSummary = <OrderSummary
                show={this.state.purchasing}
                ingredients={this.props.ingredients}
                onPurchaseCancel={this.purchaseCancelHandler}
                onPurchaseContinue={this.purchaseContinueHandler}
                price={this.props.totalPrice} />;

            burgerLayout = (
                <Auxy>
                    <Burger ingredients={this.props.ingredients} />
                    <BurgerControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disableInfo={disabledInfo}
                        purchasable={this.updatePurchasable(this.props.ingredients)}
                        price={this.props.totalPrice}
                        onOrder={this.purchaseHandler} />
                </Auxy>
            );
        }

        return (
            <Auxy>
                <Modal show={this.state.purchasing} onModalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerLayout}
            </Auxy>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));