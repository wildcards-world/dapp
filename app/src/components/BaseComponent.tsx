import React, { Component } from "react";

import Template from "./Template";

class BaseComponent extends Component {

  render() {
    return (
      <div className="App">
        <Template />
      </div>
    )
  }
}

export default BaseComponent
