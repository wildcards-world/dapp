import React, { Component } from "react";
import { DrizzleProvider } from "drizzle-react";

import drizzleOptions from "./drizzleOptions";
import BaseContainer from "./BaseContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Game from "./game/App"

class App extends Component {
  render() {
    return (
      <Router>
          <Route path='/' exact component={() => 
            {return (
              <DrizzleProvider options={drizzleOptions}>
              <BaseContainer/>
              </DrizzleProvider>
              )}}
             />
          <Route path='/game' exact component={Game} />
        </Router>
   
    );
  }
}

export default App;
