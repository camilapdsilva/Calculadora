import "./Calculator.css";
import React, { Component } from "react";
import Button from "../Components/Button";
import Display from "../Components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

class Calculator extends Component {
  state = {
    ...initialState,
  };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  doTheOperation(number1, number2, oper) {
    switch (oper) {
      case "-":
        return number1 - number2;
      case "*":
        return number1 * number2;
      case "/":
        return number1 / number2;
      default:
        return number1 + number2;
    }
  }

  setOperation(oper) {
    const { current, operation } = this.state;
    if (current === 0) {
      this.setState({ operation: oper, current: 1, clearDisplay: true });
    } else {
      const equals = oper === "=";
      const currentOperation = operation;
      const values = [...this.state.values];
      values[0] = this.doTheOperation(values[0], values[1], currentOperation);
      values[1] = 0;
      this.setState({
        displayValue: values[0],
        operation: equals ? null : oper,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    const { displayValue, clearDisplay } = this.state;
    if (n === "." && displayValue.includes(".")) {
      return;
    }

    const clear_display = displayValue === "0" || clearDisplay;
    const currentValue = clear_display ? "" : displayValue;
    const display_value = currentValue + n;
    this.setState({ displayValue: display_value, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(display_value);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button click={this.clearMemory} label="AC" triple />
        <Button click={this.setOperation} label="/" operation />
        <Button click={this.addDigit} label="7" />
        <Button click={this.addDigit} label="8" />
        <Button click={this.addDigit} label="9" />
        <Button click={this.setOperation} label="*" operation />
        <Button click={this.addDigit} label="4" />
        <Button click={this.addDigit} label="5" />
        <Button click={this.addDigit} label="6" />
        <Button click={this.setOperation} label="-" operation />
        <Button click={this.addDigit} label="1" />
        <Button click={this.addDigit} label="2" />
        <Button click={this.addDigit} label="3" />
        <Button click={this.setOperation} label="+" operation />
        <Button click={this.addDigit} label="0" double />
        <Button click={this.addDigit} label="." />
        <Button click={this.setOperation} label="=" operation />
      </div>
    );
  }
}

export default Calculator;
