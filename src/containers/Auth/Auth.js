import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email ID'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                value: '',
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                value: '',
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    };

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp
        );
    }
    handleSignSwitch = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }
    render() {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            const element = this.state.controls[key];
            formElementsArray.push(
                <Input
                    key={key}
                    elementType={element.elementType}
                    elementConfig={element.elementConfig}
                    value={element.value}
                    invalid={element.touched && !element.valid}
                    changed={(event) => this.inputChangeHandler(event, key)}
                    shouldValidate={element.validation} />
            );
        }
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.handleSubmit} noValidate>
                    {formElementsArray}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" onClicked={this.handleSignSwitch}>
                    Switch to {this.state.isSignUp ? 'Signin' : 'SignUp'}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (uid, pwd, isSignUp) => { dispatch(actions.auth(uid, pwd, isSignUp)) }
    }
}
export default connect(null, mapDispatchToProps)(Auth);