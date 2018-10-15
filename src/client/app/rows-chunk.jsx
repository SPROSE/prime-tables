/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - primes.jsx
 *  description - prime number table
 **/

// Import modules
import React from 'react';

export default class RowsChunk extends React.Component {
    static generateRows(primeTable) {
        return primeTable.map((primeNumberRow, j) => {
            return (
                <tr key={'primeNumberRow' + j}>
                    {primeTable[j].map((primeNumberColumn, k) => {
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
        });
    }

    render() {
        if (this.props.primeChunk !== undefined && this.props.primeChunk.length) {
            const rows = this.constructor.generateRows(this.props.primeChunk);

            return (
                <tbody>
                    {rows}
                </tbody>
            )
        }
    }
}