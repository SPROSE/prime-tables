/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - primes.test.jsx
 *  test - prime number table
 **/

import React from 'react';
import Primes from './../app/primes.jsx';


describe('<Primes /> component', function () {
    it('Primes renders without crashing', function () {
        shallow(<Primes
        />);
    });
});