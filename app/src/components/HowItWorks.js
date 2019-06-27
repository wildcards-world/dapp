
import React, { PropTypes, Component } from 'react';
import gorillaOnVine from '../img/wildcardsimages/hanging-gorilla-from-vine.png'

class HowItWorks extends Component {
    render() {
        return (
            <div className='how-container vine-background'>
                <div className='how-content-container'>
                    <div className='how-content'>
                        <h3>How it works</h3>
                        <hr />
                        <p>
                            You can become the patron of a gorilla, Vitalik, by adopting him for his 'for sale' price (for example 1 Eth). Vitalik the gorilla is <strong>always for sale</strong> which means that when you purchase Vitalik the gorilla, you are required to set the 'for sale' price that someone else can adopt the gorilla from you (for example 5 Eth).
                            </p>
                        <p> 
                            Through adopting Vitalik the gorilla, you pay an annual <strong>Harberger tax</strong> of 30% on your newly set sale price (5 Eth). Your harberger tax of 30% goes towards supporting gorilla conservation. <strong>Here's where it gets interesting.</strong> If someone else decides to purchase Vitalik the gorilla from you, they pay your 'for sale' price (of 5 Eth). You benefit from the upside of 4 Eth on the trade but lose patronage of Vitalik the gorilla. The new owner pays an annual harberger tax on the 'for sale' price of 30% which goes towards gorilla conservation.
                            </p>
                        <p>
                            <span className='red-disclaimer'>For the first gorilla, Vitalik. The 30% Harberger tax will pass through Wildcards to the conservation fund. The future gorillas patronage fees will go directly to the relevant conservations wallet.  </span>

                            {/* with which 15% goes to conservation and 15% of goes to     */}
                        </p>
                    </div>
                </div>
                <div className='gorilla-on-vine'>
                    <img src={gorillaOnVine} width='100%' />
                </div>
            </div>
        );
    }
}

HowItWorks.propTypes = {
};

export default HowItWorks;