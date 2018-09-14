import React, { Component } from 'react';
import Auxy from '../../hoc/Auxy'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Actions from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('https://react-burger-builder-d9d93.firebaseio.com/Ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => { return ingredients[key] })
            .reduce((sum, e) => { return sum + e }, 0);
        return sum > 0;
    }

    addIngredient = (type) => {
        // const oldIngredientCount = this.props.ingredients[type];
        // const updatedCount = oldIngredientCount + 1;
        // const updatedIngredients = { ...this.props.ingredients };
        // updatedIngredients[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICES[type];
        // const updatedPrice = this.state.totalPrice + priceAddition;
        // this.setState({
        //     totalPrice: updatedPrice,
        //     ingredients: updatedIngredients
        // });
        // this.updatePurchasable(updatedIngredients);
    }

    // removeIngredient = (type) => {
    //     const oldIngredientCount = this.props.ingredients[type];
    //     if (oldIngredientCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldIngredientCount - 1;
    //     const updatedIngredients = { ...this.props.ingredients };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const updatedPrice = this.state.totalPrice - priceDeduction;
    //     this.setState({
    //         totalPrice: updatedPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchasable(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        let burgerLayout = this.state.error ? <h2> Error loading ingredients!!</h2> : <Spinner />;
        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch({ type: Actions.ADD_INGREDIENT, payload: ingName }),
        removeIngredient: (ingName) => dispatch({ type: Actions.REMOVE_INGREDIENT, payload: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));