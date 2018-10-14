/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - primes.test.jsx
 *  test - prime number table
 **/

import React from 'react';
import Primes from './../app/primes.jsx';


describe('<Primes /> component', function () {
    let wrapper;
    let instance;
    it('Primes renders without crashing', function () {
        wrapper = shallow(<Primes />);
        instance = wrapper.instance();
    });

    it('Epected results from loopUntilPrimesToGenerate function', function () {
        const expectedArray = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        return instance.loopUntilPrimesToGenerate(10)
            .then(response => {
                expect(response).toHaveLength(10);
                expect(response).toEqual(expectedArray);
            })
    });

    it('Generating 100000 prime numbers - expected to slow the test to around 25 seconds', function () {
        return instance.loopUntilPrimesToGenerate(1000000)
            .then(response => {
                expect(response).toHaveLength(1000000);
            })
    });
});