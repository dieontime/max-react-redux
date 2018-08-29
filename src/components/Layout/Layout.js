import React from 'react';
import Auxy from '../../hoc/Auxy';

const layout = (props) => (
    <Auxy>
        <div>
            toolbar, sidebar, backdrop
            </div>
        <main>
            {props.children}
        </main>
    </Auxy>
)

export default layout;