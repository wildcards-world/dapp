import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DrizzleProvider } from "drizzle-react";

import "./App.css";

import drizzleOptions from "./drizzleOptions";
import BaseContainer from "./BaseContainer";

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <BaseContainer />
      </DrizzleProvider>
    );
  }
}

/* unused in contract, but keeping for now */
class Metadata extends Component {

  data: any

  constructor() {
    super({}, {});
    this.data = {
      name: "Wild Cards",
      description: "The token of endangerd animals",
      image: "https://static.thenounproject.com/png/6866-200.png"
    };
  }
  render() {
    return (
      <div>{JSON.stringify(this.data)}</div>
    )
  }
}

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact component={App} />
        <Route path='/metadata' exact component={Metadata} />
      </Router>
    )
  }
}

export default AppRoutes;
