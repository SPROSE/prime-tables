/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - primes.test.jsx
 *  test - prime number table
 **/

import React from 'react';
import TextInput from './../app/user-input.jsx';

describe('<TextInput /> component', function () {
    it('TextInput renders without crashing', function () {
        shallow(<TextInput
        />);
    });
});