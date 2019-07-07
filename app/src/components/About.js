
import React, { PropTypes, Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className='about-container'>
          <p className='about-content'>
          <span className='about-highlights'>Wildcards</span> is an idea born out of the <a href='https://ethcapetown.com/'>#ETHCapeTown2019</a> hackathon which saw team Wildcards as overall <a href='https://devpost.com/software/ethcapetown_wildcards'>winners</a>. The focus of the project is providing a platform where funds can be generated for endangered animals. The wildcards platform hosts always for sale <span className='about-highlights'>non-fungible tokens</span> representing real <span className='about-highlights'>endangered animals</span>.
          </p>
      </div>
    );
  }
}

About.propTypes = {
};

export default About;