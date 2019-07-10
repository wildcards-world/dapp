import React, { Component } from "react";
import { DrizzleProvider } from "drizzle-react";

import drizzleOptions from "./drizzleOptions";
import BaseContainer from "./BaseContainer";
import { HashRouter as Router, Route, Link } from "react-router-dom"
import Game from "./game/App"

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <Router basename={window.location.pathname.includes("dapp") ? '/dapp' : ''}>
          <Route path='/' exact component={BaseContainer} />
          <Route path='/game' exact component={Game} />
        </Router>
      </DrizzleProvider >

    );
  }
}

export default App;
