import React, {Component} from 'react';
import '../Styles/ThemeSelector.css';
import ThemeOption from "./ThemeOption";

class ThemeSelector extends Component {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.keyOpen = this.keyOpen.bind(this);
        this.handleSelection = this.handleSelection.bind(this);

        this.state = {
            icon: "⮞",
            open: false,
            selectedTheme: localStorage.getItem('theme') || 'default'
        };

        document.body.classList.add(`theme-${this.state.selectedTheme}`);
    }

    open() {
        if (!this.state.open) {
            document.getElementById("themeSidebar").style.width = "250px";
            document.getElementById("openSidebar").style.left = "250px";
            this.setState({open: true});
        } else {
            document.getElementById("themeSidebar").style.width = "0px";
            document.getElementById("openSidebar").style.left = "0px";
            this.setState({open: false});
        }
    }

    keyOpen(e) {
        if (e.keyCode === 32 || e.keyCode === 13) {
            e.preventDefault();
            this.open();
        }
    }

    handleSelection(theme) {
        document.body.className = "";
        document.body.classList.add(`theme-${theme}`);
        this.setState({selectedTheme: theme}, () => {
            localStorage.setItem('theme', theme)
        });
    }

    render() {
        return (
            <div className={"themed"}>
                <button id={"openSidebar"}
                        className={this.state.open ? "close" : ""}
                        onClick={this.open} onKeyDown={this.keyOpen}
                        tabIndex={"0"}>{this.state.icon}
                </button>
                <section id={"themeSidebar"}>
                    <h1>Themes</h1>
                    <fieldset>
                        {['default', 'eggplant', 'fuchsia', 'goth', 'lawn', 'neapolitan', 'sky', 'sunset', 'phosphor', 'pink',].map((item) => {
                            return <ThemeOption key={`option-${item}`} name={"theme"} text={item}
                                                tabbable={this.state.open}
                                                checked={item === this.state.selectedTheme}
                                                onSelection={this.handleSelection}/>
                        })
                        }
                    </fieldset>
                </section>
                {this.props.children}
            </div>
        );
    }
}

export default ThemeSelector;