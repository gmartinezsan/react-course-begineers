import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import base from "../base";

import sampleFishes from "../sample-fishes.js";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    // reinstate the localstorage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    // console.log(localStorageRef);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    // console.log(this.state.order);
    // console.log(this.props.match.params.storeId);
    //
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    //    1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    //    2.  Add the new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //    3.  Set the new fishes object to state
    this.setState({
      fishes: fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // 1 take a copy of the current  fish
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //    1 take a copy of the state
    const order = { ...this.state.order };
    // 2 add to the order
    order[key] = order[key] + 1 || 1;
    // 3 call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
