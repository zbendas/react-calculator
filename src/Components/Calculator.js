import React from 'react';
import '../Styles/Calculator.css';
import CalcButton from "./CalcButton";
import FuncButton from "./FuncButton";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleOperand = this.handleOperand.bind(this);
        this.handleOperation = this.handleOperation.bind(this);

        this.state = {
            machineState: 'initial', // Possible values: initial, awaitingOperand, calculationDone
            operand1: 0,
            operand2: 0,
            fractional: false, // Set when a decimal is pressed, cleared when function is used
            operation: null,
            result: null,
            overflow: false // Set when multiplication overflows
        }

        this.defaultState = this.state;
    }

    getReadout() {
        if (this.state.overflow) {
            return 'OE';
        } else if (this.state.machineState === 'initial') {
            return this.state.operand1;
        } else if (this.state.machineState === 'awaitingOperand') {
            return this.state.operand2;
        } else if (this.state.machineState === 'calculationDone') {
            return this.state.result;
        }
    }

    checkOperandLength(operand, index) {
        if (String(operand).length >= 10) {
            console.log("Too long");
            index === 1 ? this.setState({operand1: parseFloat(String(operand).slice(0, 10))}) : this.setState({operand2: parseFloat(String(operand).slice(0, 10))});
        }
    }

    handleOperand(operand) {
        if (this.state.machineState === 'initial') {
            if (!this.state.fractional) {
                this.setState({
                    operand1: (this.state.operand1 * 10) + operand,
                    overflow: false
                }, () => this.checkOperandLength(this.state.operand1, 1));
            } else {
                this.setState({
                        operand1: parseFloat((this.state.operand1.toString() + operand.toString().slice(0, 9))),
                        overflow: false
                    },
                    () => this.checkOperandLength(this.state.operand1, 1));
            }
        } else if (this.state.machineState === 'awaitingOperand') {
            if (!this.state.fractional) {
                this.setState({
                    operand2: (this.state.operand2 * 10) + operand,
                    overflow: false
                }, () => this.checkOperandLength(this.state.operand2, 2));
            } else {
                this.setState({
                        operand2: parseFloat(this.state.operand2.toString() + operand.toString()),
                        overflow: false
                    },
                    () => this.checkOperandLength(this.state.operand2, 2));
            }
        } else {
            this.setState({machineState: 'initial'}, () => this.handleOperand(operand));
        }
    }

    handleOperation(operation) {
        switch (operation) {
            case 'plus':
                if (this.state.machineState === 'initial') {
                    this.setState({operation: 'addition', fractional: false, machineState: 'awaitingOperand'});
                } else if (this.state.machineState === 'calculationDone') {
                    this.setState({
                        operand1: this.state.result,
                        result: null,
                        fractional: false,
                        operation: 'addition',
                        machineState: 'awaitingOperand'
                    })
                }
                return
            case 'minus':
                if (this.state.machineState === 'initial') {
                    this.setState({operation: 'subtraction', fractional: false, machineState: 'awaitingOperand'});
                } else if (this.state.machineState === 'calculationDone') {
                    this.setState({
                        operand1: this.state.result,
                        result: null,
                        fractional: false,
                        operation: 'subtraction',
                        machineState: 'awaitingOperand'
                    })
                }
                return
            case 'divide':
                if (this.state.machineState === 'initial') {
                    this.setState({operation: 'division', fractional: false, machineState: 'awaitingOperand'});
                } else if (this.state.machineState === 'calculationDone') {
                    this.setState({
                        operand1: this.state.result,
                        result: null,
                        fractional: false,
                        operation: 'division',
                        machineState: 'awaitingOperand'
                    })
                }
                return
            case 'multiply':
                if (this.state.machineState === 'initial') {
                    this.setState({operation: 'multiplication', fractional: false, machineState: 'awaitingOperand'});
                } else if (this.state.machineState === 'calculationDone') {
                    this.setState({
                        operand1: this.state.result,
                        result: null,
                        fractional: false,
                        operation: 'multiplication',
                        machineState: 'awaitingOperand'
                    })
                }
                return
            case 'equals':
                if (this.state.operation === 'addition') {
                    let result = parseFloat(String(this.state.operand1 + this.state.operand2).slice(0, 10));
                    let overflow = false;
                    if ((Math.sign(this.state.operand1) === Math.sign(this.state.operand2)) && Math.sign(this.state.operand1) === 1) {
                        if (result < this.state.operand1 || result < this.state.operand2) {
                            result = 0;
                            overflow = true;
                        }
                    } else if ((Math.sign(this.state.operand1) === Math.sign(this.state.operand2)) && Math.sign(this.state.operand1) === -1) {
                        if (result > this.state.operand1 || result > this.state.operand2) {
                            result = 0;
                            overflow = true;
                        }
                    }
                    this.setState({
                        ...this.defaultState,
                        result: result,
                        overflow: overflow,
                        machineState: 'calculationDone'
                    });
                } else if (this.state.operation === 'subtraction') {
                    let result = this.state.operand1 - this.state.operand2;
                    this.setState({
                        ...this.defaultState,
                        result: parseFloat(String(result).slice(0, 10)),
                        machineState: 'calculationDone'
                    });
                } else if (this.state.operation === 'division') {
                    let result = this.state.operand1 / this.state.operand2;
                    this.setState({
                        ...this.defaultState,
                        result: parseFloat(String(result).slice(0, 10)),
                        machineState: 'calculationDone'
                    });
                } else if (this.state.operation === 'multiplication') {
                    let result = this.state.operand1 * this.state.operand2;
                    let overflow = false;
                    if (String(result).length >= 10) {
                        result = 0;
                        overflow = true;
                    }
                    this.setState({
                        ...this.defaultState,
                        result: result,
                        overflow: overflow,
                        machineState: 'calculationDone'
                    });
                }
                return
            case 'period':
                if (this.state.machineState === 'initial') {
                    this.setState({operand1: this.state.operand1.toString() + '.', fractional: true})
                } else if (this.state.machineState === 'awaitingOperand') {
                    this.setState({operand2: this.state.operand2.toString() + '.', fractional: true})
                } else if (this.state.machineState === 'calculationDone') {
                    this.setState({operand1: "0.", fractional: true, machineState: 'initial'})
                }
                return
            case 'clear':
                this.setState(this.defaultState);
                return
            case 'clearEntry':
                if (this.state.machineState === 'initial') {
                    this.setState({operand1: 0, machineState: 'initial'});
                } else if (this.state.machineState === 'awaitingOperand') {
                    this.setState({operand2: 0, machineState: 'awaitingOperand'});
                } else {
                    this.handleOperation('clear');
                }
                return
            default:
                return
        }
    }

    render() {
        return (
            <div id="Calculator">
                <div id="readout">
                    <span className="result">{this.getReadout()}</span>
                </div>
                {[...Array(10).keys()].reverse().map((number) => {
                        return (<CalcButton text={number} key={'button_' + number} onOperand={this.handleOperand}/>);
                    }
                )}
                {
                    Object.entries({
                        plus: "+",
                        minus: "-",
                        equals: "=",
                        period: ".",
                        clear: "C",
                        clearEntry: "CE",
                        divide: "÷",
                        multiply: "×"
                    }).map((object) => {
                        return <FuncButton name={object[0]} text={object[1]} key={'button_' + object[0]}
                                           onOperation={this.handleOperation}/>
                    })
                }
            </div>
        )
    };
}

export default Calculator;