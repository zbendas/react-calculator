import React, {Component} from 'react';

class ThemeOption extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

    }

    handleChange() {
        this.props.onSelection(this.props.text);
    }

    handleKeyDown(e) {
        if (e.keyCode === 32) {
            this.handleChange();
        }
    }

    render() {
        return (
            <div tabIndex={this.props.tabbable ? "0" : "-1"} onClick={this.handleChange} onKeyDown={this.handleKeyDown}>
                <input type={"radio"} checked={this.props.checked} onChange={this.handleChange} tabIndex={"-1"}/>
                <label tabIndex={"-1"}>{this.props.text}</label>
            </div>
        );
    }
}

export default ThemeOption;