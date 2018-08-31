import React, { Component } from 'react';
import Auxy from '../../hoc/Auxy';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    render() {
        return (
            <Auxy>
                <Toolbar toggleSideDrawer={this.sideDrawerToggle} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.closeSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxy>
        );
    }
}

export default Layout;