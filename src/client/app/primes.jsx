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
            primeTable: [],
            primesToGenerate: "",
            loading: false
        };

        // Setup all functions requiring use of this
        this.generatePrimes = this.generatePrimes.bind(this);
        this.generatePrimeTable = this.generatePrimeTable.bind(this);
        this.loopUntilPrimesToGenerate = this.loopUntilPrimesToGenerate.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    generatePrimes() {
        const primesToGenerate = Number(this.state.primesToGenerate);
        this.setState({
            loading: true
        });

        this.loopUntilPrimesToGenerate(primesToGenerate).then(response => {
            this.generatePrimeTable(response);
        });
    }

    loopUntilPrimesToGenerate(primesToGenerate) {
        return new Promise((resolve) => {
            let i = 2;
            let primeNumbers = [];
            // set map to store values not prime to help with prime checks
            let markedNotPrimeMap = new Map();

            while (primeNumbers.length < primesToGenerate) {
                if (!(markedNotPrimeMap.has(i))) {
                    markedNotPrimeMap.set(i**2, [i]);
                    primeNumbers.push(i);
                } else {
                    let primes = markedNotPrimeMap.get(i);
                    primes.forEach(prime=> {
                        let nextMultipleOfPrime = prime + i;
                        if (markedNotPrimeMap.has(nextMultipleOfPrime)) {
                            markedNotPrimeMap.get(nextMultipleOfPrime).push(prime);
                        } else {
                            markedNotPrimeMap.set(nextMultipleOfPrime, [prime]);
                        }
                    });
                    // Delete as we pass these values to keep the list low
                    markedNotPrimeMap.delete(i);
                }

                // Once we hit the number of primes required, resolve
                if (primesToGenerate === primeNumbers.length) {
                    resolve(primeNumbers);
                }
                i++
            }
        });
    }

    generatePrimeTable(primes) {
        let primeTable = [];

        primes.map((primeNumberRow) => {
            let row = [];
            row.push(primeNumberRow);
            primes.map((primeNumberColumn) => {
                row.push(primeNumberRow * primeNumberColumn);
            });
            primeTable.push(row);
        });
        this.setState({
            primeNumbers: primes,
            primeTable: primeTable,
            loading: false
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.heading}</h1>
                <div className={"row"}>
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
                </div>
                <div className={"row"}>
                { !this.state.loading ?
                    <div className="col-xs-12 table-responsive">
                        <table className="table table-striped">
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
                            {this.state.primeTable.map((primeNumberRow, j) => {
                                return (
                                    <tr key={'primeNumberRow' + j}>
                                        {this.state.primeTable[j].map((primeNumberColumn, k) => {
                                            if (k === 0) {
                                                return (
                                                    <th key={'primeNumberRow' + j + 'primeNumberColumn' + k}>{primeNumberColumn}</th>
                                                )
                                            }
                                            else {
                                                return (
                                                    <td key={'primeNumberRow' + j + 'primeNumberColumn' + k}>{primeNumberColumn}</td>
                                                )
                                            }
                                        })}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    :
                    <p>Loading table...</p>
                }
                </div>
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