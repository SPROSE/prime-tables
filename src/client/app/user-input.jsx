/**
 *  author - richard.sproson
 *  date - 13.10.2018
 *  file - user-input.jsx
 *  description - input how many prime numbers are to be generated
 **/

import React from 'react';

export default class TextInput extends React.Component {
    constructor (props) {
        super(props);

        // State to handle input validation
        this.state = {
            errorState: false,
            errorMessage: ""
        };

        this.checkInput = this.checkInput.bind(this);
    }

    render () {
        return (
            <div className="form-group">
                <label htmlFor={"primesToGenerate"} className="col-sm-4 col-xs-12">{this.props.label}{this.props.required === "true" ? '*' : null }</label>
                <div className="col-sm-8 col-xs-12">
                    <input
                        type="text"
                        className={this.state.errorState ? "form-control error" : "form-control"}
                        value={this.props.value}
                        name={"primesToGenerate"}
                        placeholder={this.props.placeholder}
                        onChange={this.checkInput}
                    />
                    { this.state.errorState ?
                        <div className="alert alert-error">
                            {this.state.errorMessage}
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }

    checkInput(e) {
        if (this.constructor.validateInput(e.target.value)) {
            this.setState({
                errorState: false,
                errorMessage: ""
            });
            this.props.updateParent({primesToGenerate: e.target.value});
        }
        else {
            this.setState({
                errorState: true,
                errorMessage: "Please enter a valid " + this.props.inputType + "."
            });
            this.props.updateParent({primesToGenerate: e.target.value});
        }
    }

    static validateInput(value) {
        // Check value is more than 0, contains no decimals
        return (value > 0 && value % 1 === 0);
    }
}