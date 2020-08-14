import React from 'react';
import '../Styles/CalcButton.css';

class CalcButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onOperand(parseInt(this.props.text));
    }

    render() {
        return (
            <div className="CalcButton" style={{gridArea: `button_${this.props.text}`}} onClick={this.handleClick}>
                <span className="text">{this.props.text}</span>
            </div>
        );
    }
}

export default CalcButton;