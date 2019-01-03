import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";

// set up our store

// takes in (state: { count }, action: { type: string }), returns state: { count }
const reducer = (state = { count: 0 }, action) => {
  // return the new state
  console.log("state", state, "action", action);

  switch (action.type) {
    case "CHANGE":
      return { count: state.count + action.value };
    default:
      return state;
  }
};

const makeAction = (num) => {
  return {type: "CHANGE", value: num}
}

const store = createStore(reducer);

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
      </div>
    );
  }
}

class Header extends Component {
  renderDescription = () => {
    const count = store.getState().count;
    const remainder = count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${count + upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {

  makeButtons = () => {
  let arr = []
  for(let i = -10; i<11; i++) {
    arr.push(<button onClick={ () => {store.dispatch(makeAction(i))} }> {i} </button>)
  }
  return arr
  }

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
          {this.makeButtons()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
