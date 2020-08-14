import React, {Component} from 'react';
import '../Styles/CalcButton.css';

class FuncButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onOperation(this.props.name);
    }

    render() {
        return (
            <div className="CalcButton function" key={'button_' + this.props.name} style={{gridArea: `button_${this.props.name}`}} onClick={this.handleClick}>
                <span className="text">{this.props.text}</span>
            </div>
        );
    }
}

export default FuncButton;