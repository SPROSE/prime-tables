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
import RowsChunk from "./rows-chunk.jsx";

export default class Primes extends React.Component {
    constructor(props) {
        super(props);
        // Setup rough state object for load.
        this.state = {
            heading: "Generate a prime table",
            primeNumbers: [],
            primeTable: [],
            primesToGenerate: "",
            chunksToShow: 0,
            loading: false
        };

        // Setup all functions requiring use of this
        this.generatePrimes = this.generatePrimes.bind(this);
        this.generatePrimeTable = this.generatePrimeTable.bind(this);
        this.loopUntilPrimesToGenerate = this.loopUntilPrimesToGenerate.bind(this);
        this.loadAnotherChunk = this.loadAnotherChunk.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    generatePrimes() {
        this.setState({
            loading: true
        });

        const primesToGenerate = Number(this.state.primesToGenerate);
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
                    console.log('primeNumbers generated', primeNumbers);
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
            chunksToShow: 1,
            loading: false
        });
    }

    loadAnotherChunk() {
        this.setState({
            chunksToShow: this.state.chunksToShow + 1
        });
    }

    static generateChunkedArray(primeArray) {
        const chunk =
            (size, xs) =>
                xs.reduce(
                    (segments, _, index) =>
                        index % size === 0
                            ? [...segments, xs.slice(index, index + size)]
                            : segments,
                    []
                );
        return chunk(10, primeArray);
    }

    render() {
        const chunkPrimeArray = this.constructor.generateChunkedArray(this.state.primeTable);

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
                { !this.state.loading && this.state.primeTable.length ?
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
                            {chunkPrimeArray.slice(0, this.state.chunksToShow).map((primeArray, j) => {
                                return (
                                    <RowsChunk
                                        key={'chunk' + j}
                                        primeChunk={primeArray}
                                    />
                                )
                            })}
                        </table>
                        {chunkPrimeArray.length !== this.state.chunksToShow ?
                            <button className={"btn btn-default"} onClick={this.loadAnotherChunk}>Load More Results</button>
                            :
                            null
                        }
                    </div>
                    :
                    <div className={"col-xs-12"}>
                        <p>When requesting a large amount of primes please wait for the table to generate. The console will show you the prime numbers array.</p>
                    </div>
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