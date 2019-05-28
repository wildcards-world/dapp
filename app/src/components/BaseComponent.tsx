import React, { Component } from "react";

import IntroSection from "./IntroSection";
import ActionSection from "./ActionSection";
import ArtistSection from "./ArtistSection";
import BuyingArtSection from "./BuyingArtSection";
import AboutArtSection from "./AboutArtSection";
// import AnimalAdoptionEntry from "./AnimalAdoptionApp/AnimalAdoptionEntry";

// import cc from "cryptocompare";  //TODO

class BaseComponent extends Component {

  render() {
    return (
      <div className="App">
        {/* <AnimalAdoptionEntry/> */}
        <IntroSection />
        <BuyingArtSection />
        <ActionSection />
        <AboutArtSection />
        <ArtistSection />
      </div>
    );
  }
}

export default BaseComponent
