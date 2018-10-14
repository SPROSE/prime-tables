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
            primesToGenerate: ""
        };

        // Setup any hard variables not required in the DOM
        this.maxNumbersToLoop = 1000; // If array is bigger than this it will split for performance

        // Setup all functions requiring use of this
        this.generatePrimes = this.generatePrimes.bind(this);
        this.loopUntilPrimesToGenerate = this.loopUntilPrimesToGenerate.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    generatePrimes() {
        const primesToGenerate = Number(this.state.primesToGenerate);

        this.loopUntilPrimesToGenerate(primesToGenerate).then(response => {
            this.setState({primeNumbers: response});
        });
    }

    loopUntilPrimesToGenerate(primesToGenerate) {
        return new Promise((resolve) => {
            let i = 2;
            let primeNumbers = [];
            while (primeNumbers.length < primesToGenerate) {
                if (this.constructor.isPrime(i)) {
                    primeNumbers.push(i);
                }

                if (primesToGenerate === primeNumbers.length) {
                    resolve(primeNumbers);
                }
                i++
            }
        });
    }

    static isPrime(num) {
        if (num === 0 || num === 1) {
            return false;
        }
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    render() {
        return (
            <div>
                <h1>{this.state.heading}</h1>
                <div className={"col-md-6 col-xs-12"}>
                    <TextInput
                        required={true}
                        value={this.state.primesToGenerate}
                        label={"Enter number of primes to generate"}
                        inputType={"number"}
                        placeholder={"Enter a numeric value"}
                        updateParent={this.updateState}
                    />
                </div>
                <div className={"col-md-6 col-xs-12"}>
                    <button onClick={this.generatePrimes} className={"btn btn-primary"} disabled={this.state.primesToGenerate === ("" || 0)}>
                        Generate Prime Table
                    </button>
                </div>
                { this.state.primeNumbers.length ?
                    <table className="table table-striped table-responsive">
                        <thead>
                        <tr>
                            <th> </th>
                            {this.state.primeNumbers.map((number, i) => {
                                return (
                                    <th key={'heading' + i}>{number}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.primeNumbers.map((primeNumberRow, j) => {
                            return (
                                <tr key={'primeNumberRow' + j}>
                                    <th>{primeNumberRow}</th>

                                    {this.state.primeNumbers.map((primeNumberColumn, k) => {
                                        return (
                                            <td key={'primeNumberRow' + j + 'primeNumberColumn' + k}>{primeNumberRow * primeNumberColumn}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    :
                    null }
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