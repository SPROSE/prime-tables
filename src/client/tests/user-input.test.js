/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - primes.test.jsx
 *  test - prime number table
 **/

import React from 'react';
import TextInput from './../app/user-input.jsx';

describe('<TextInput /> component', function () {
    let wrapper;
    it('TextInput renders without crashing', function () {
        wrapper = shallow(<TextInput />);
    });

    it('Checks user input to see if it is valid', function () {
        let instance = wrapper.instance();
        expect(instance.constructor.validateInput(10)).toEqual(true);
        expect(instance.constructor.validateInput(10000)).toEqual(true);
        expect(instance.constructor.validateInput(-5)).toEqual(false);
        expect(instance.constructor.validateInput(1.5)).toEqual(false);
    });
});