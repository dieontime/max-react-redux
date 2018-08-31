import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxy from '../../../hoc/Auxy';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    let allClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        allClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxy>
            <Backdrop show={props.open} onClose={props.close} />
            <div className={allClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxy>
    );
};

export default sideDrawer;