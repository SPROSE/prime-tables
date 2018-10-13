/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - index.jsx
 *  description - pass the app to the dom.
 **/

// Import modules
import React from 'react';
import {render} from 'react-dom';

// Import classes
import Primes from './primes.jsx';

class App extends React.Component {
    render() {
        return (
            <Primes />
        )
    }
}

render(<App />, document.getElementById('app'));