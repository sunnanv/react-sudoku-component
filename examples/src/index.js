import React from 'react';
import { render} from 'react-dom';
import Sudoku from '../../src';
import './styles.css';
import examples from './codeExamples';

const emptyItem = {
    example: ``,
    code: <></>,
    info: ``,
    values: []
}

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTitle: 'Basic Example',
            currentItem: examples['Basic Example']
        }
    }


    handleSelected = (name, item) => {
        this.setState({
            currentTitle: name,
            currentItem: emptyItem
        }, ()=>{
            this.setState({
                currentItem: item
            })
        })
    };


    render() {
        const {currentItem} = this.state;
        return (
            <>
                <h1 className="title">react-sudoku-component</h1>
                <Navbar navItems={examples} currentName={this.state.currentTitle} onSelected={(name, item) => this.handleSelected(name, item)}/>
                <h2 className="title">{this.state.currentTitle}</h2>
                <div className="text-container">
                    <p className="subtitle">Description</p>
                    {this.state.currentItem.info.split('\n').map(item => <span>{item}<br/></span>)}
                </div>

                <hr style={{width: '500px', border: 'none', borderTop: '1px solid gray'}} />
                {currentItem.values
                    ?
                    <>
                    <div className="text-container">
                        <p className="subtitle">Allowed values</p>
                        <p>{this.state.currentItem.allowedValuesDescription}</p>
                        <div className="values-container">
                        {currentItem.values.map((value) => {
                            return value === currentItem.default
                                ? <p className="values default-value">{value}</p>
                                : <p className="values">{value}</p>
                        })}
                        </div>
                    </div>
                    <hr style={{width: '500px', border: 'none', borderTop: '1px solid gray'}} />
                    </>
                    : null

                }
                <div className="text-container">
                    <p className="subtitle">Example</p>
                    <div className="codebox">
                        <span>{'<Sudoku '}</span>
                        {this.state.currentItem.example.length !== 0?
                            <><br/>
                            {this.state.currentItem.example.split('\n').map(item => <span>&emsp;{item}<br/></span>)}</>
                        : null}
                        <span>{'/>'}</span>
                    </div>
                </div>


                {this.state.currentItem.code}
            </>
        )
    }

}

const Navbar = ({navItems, onSelected, currentName}) => {

    return (
        <div className="navbar">
            {Object.keys(navItems).map(itemName => {
                return <NavItem
                    name={itemName}
                    currentName={currentName}
                    item={navItems[itemName]}
                    onSelected={onSelected}
                />
            })}
        </div>
    )
};

const NavItem = ({name, item, onSelected, currentName}) => {

    return (
        <button className={name===currentName? 'navitem active-navitem' : 'navitem'} onClick={() => onSelected(name, item)}>{name}</button>
    )
};

render(<App />, document.getElementById("root"));