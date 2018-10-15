
/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - rows-chunk.test.jsx
 *  test - prime number table
 **/

import React from 'react';
import RowsChunk from './../app/rows-chunk.jsx';

describe('<RowsChunk /> component', function () {
    let wrapper;

    it('RowsChunk renders without crashing', function () {
        wrapper = shallow(<RowsChunk />);
    });
});