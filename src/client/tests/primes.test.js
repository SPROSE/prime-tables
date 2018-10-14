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

    it('Check if is prime number', function () {
        expect(instance.constructor.isPrime(3)).toEqual(true);
        expect(instance.constructor.isPrime(7)).toEqual(true);
        expect(instance.constructor.isPrime(10)).toEqual(false);
        expect(instance.constructor.isPrime(0)).toEqual(false);
        expect(instance.constructor.isPrime(1)).toEqual(false);
    });

    it('Should expect promise to resolve', function () {
        const expectedArray = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        return instance.loopUntilPrimesToGenerate(10)
            .then(response => {
                expect(response).toHaveLength(10);
                expect(response).toEqual(expectedArray);
            })
    });
});