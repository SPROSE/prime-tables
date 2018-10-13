/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - primes.jsx
 *  description - prime number table
 **/

// Import modules
import React from 'react';

// Import classes
import TextInput from './user-input.jsx';

export default class Primes extends React.Component {
    constructor(props) {
        super(props);
        // Setup rough state object for load.
        this.state = {
            heading: "Generate a prime table",
            primeNumbers: [],
            primesToGenerate: 0
        };

        // Setup any hard variables not required in the DOM
        this.maxNumbersToLoop = 1000; // If array is bigger than this it will split for performance

        // Setup all functions requiring use of this
        this.updateState = this.updateState.bind(this);
    }

    render() {
        return (
            <div>
                <h1>{this.state.heading}</h1>
                <div className={"col-md-6 col-xs-12"}>
                    <TextInput
                        required={true}
                        value={this.state.primesToGenerate}
                        label={"Enter prime numbers to generate"}
                        inputType={"number"}
                        placeholder={"Enter a numeric value"}
                        updateParent={this.updateState}
                    />
                </div>
                <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    /**
     * For use with child components to update parent state
     * @param json
     */
    updateState(json) {
        this.setState(json);
    }
}