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
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "ADD_THREE":
      return { count: state.count + 3 };
    case "SUBTRACT_FIVE":
      return {count: state.count - 5};
    default:
      return state;
  }
};

// actions
// object
// 'type' key
// ...and anything else we need

const incrementAction = { type: "INCREMENT" };
const decrementAction = { type: "DECREMENT" };
const addThreeAction = { type: "ADD_THREE"};
const subtractFiveAction = {type: "SUBTRACT_FIVE"};

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
  increment = () => {
    store.dispatch(incrementAction);
  };

  decrement = () => {
    store.dispatch(decrementAction);
  };

  addThree = () => {
    store.dispatch(addThreeAction);
  }

  subtractFive = () => {
    store.dispatch(subtractFiveAction)
  }

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={this.subtractFive}> -5 </button>
        <button onClick={this.decrement}> - </button>
        <button onClick={this.increment}> + </button>
        <button onClick={this.addThree}> +3 </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
