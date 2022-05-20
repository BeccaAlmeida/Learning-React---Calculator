import React, { Component } from "react";
import './calculator.css';

import Display from "../components/display/Display";
import Button from "../components/button/Button";

const initState = {
    displayValue: '0',
    resetDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initState }

    constructor(props) {
        super(props);
        this.resetValue = this.resetValue.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    resetValue() {
        this.setState({ ...initState })
    }

    setOperation(operation) {
        if(this.state.current === 0) {
            this.setState({ operation, current: 1, resetDisplay: true })
        } else {
            const equal = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values];
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
            } catch (error) {
                values[0] = this.state.values[0];
            }
            
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equal ? null : operation,
                current: equal ? 0 : 1,
                resetDisplay: !equal,
                values 
            })
        }
    }

    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const resetValue = this.state.displayValue === '0' || this.state.resetDisplay;
        const currentValue = resetValue ? '' : this.state.displayValue;
        const displayValue = currentValue + n
        this.setState({displayValue, resetDisplay: false});

        if(n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [ ...this.state.values];
            values[i] = newValue;
            this.setState({ values });
            console.log(values)
        }
    }

    render() {
        return (
            <div className="calculatorContent">
                <Display value={this.state.displayValue} />
                <Button label={'AC'} click={this.resetValue} triple />
                <Button label={'/'} click={this.setOperation} operation />
                <Button label={7} click={this.addDigit} />
                <Button label={8} click={this.addDigit} />
                <Button label={9} click={this.addDigit} />
                <Button label={'*'} click={this.setOperation} operation />
                <Button label={4} click={this.addDigit} />
                <Button label={5} click={this.addDigit} />
                <Button label={6} click={this.addDigit} />
                <Button label={'-'} click={this.setOperation} operation />
                <Button label={1} click={this.addDigit} />
                <Button label={2} click={this.addDigit} />
                <Button label={3} click={this.addDigit} />
                <Button label={'+'} click={this.setOperation} operation /> 
                <Button label={0} click={this.addDigit} double />
                <Button label={'.'} click={this.addDigit} />
                <Button label={'='} click={this.setOperation} operation />
            </div>
        )
    }
}