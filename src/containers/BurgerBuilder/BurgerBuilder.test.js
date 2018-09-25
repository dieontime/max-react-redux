import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => { }} />);
    });

    it('should contain <BuildControls /> if ingredients is present', () => {
        wrapper.setProps({ ingredients: { cheese: 1 } });
        expect(wrapper.find(BurgerControls)).toHaveLength(1);
    });
});