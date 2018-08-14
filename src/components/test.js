import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };

        this.onNameChange = this.onNameChange.bind(this);
    }

    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.onNameChange} />
                <h3>Name: {this.state.name}</h3>
            </div>
        );
    }

}
export const Com = (props) => {
    return (
        <div>
            <h2>test com: {props.awesome}</h2>
            <h1>{props.children}</h1>
        </div>
    );

}

export default Test;