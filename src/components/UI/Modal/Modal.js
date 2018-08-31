import React from 'react';
import classes from './Modal.css';
import Auxy from '../../../hoc/Auxy';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    const modalClasses = [classes.Modal];
    modalClasses.push(
        props.show ? classes.Show : classes.Hide
    );

    return (
        <Auxy>
            <Backdrop show={props.show} onClose={props.onModalClosed} />
            <div className={modalClasses.join(' ')}>
                {props.children}
            </div>
        </Auxy>
    );
}

export default modal;