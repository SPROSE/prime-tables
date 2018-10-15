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

    it('Generating 1000000 prime numbers', function () {
        return instance.loopUntilPrimesToGenerate(1000000)
            .then(response => {
                expect(response).toHaveLength(1000000);
            })
    });

    it('Generates chunks from the primeTable array so this can be loaded chunk at a time', function () {
        const arrayOfPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
        expect(instance.constructor.generateChunkedArray(arrayOfPrimes)).toHaveLength(2);
    });

    it('Show more results - this should + 1 to chunksToShow in state', function () {
        wrapper.setState({chunksToShow: 1});
        instance.loadAnotherChunk();
        expect(instance.state.chunksToShow).toEqual(2);
    });
});