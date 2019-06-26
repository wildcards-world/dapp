
import React, { PropTypes, Component } from 'react';
import gorillaOnVine from '../img/wildcardsimages/gorilla-on-vine.png'

class CoreConcepts extends Component {
    render() {
        return (
            <div className='problem-solution-container vine-background'>
                <div className='gorilla-on-vine'>
                    <img src={gorillaOnVine} width='100%' />
                </div>
                <div className='problem-solution-content-container'>
                    <div className='problem-solution-content'>
                        <h2>Core Concepts</h2>
                        <hr/>
                        <h3>Non-fungible token</h3>
                        <p>
                            A <stong>non-fungible token</stong> is a way to ensure digital assets are unique and easily tradable on a blockchain.
                        </p>
                        <h3>Always For Sale</h3>
                        <p>
                            When an asset is bought a new selling price is stipulated by the buyer. Assets are <strong>always for sale</strong>, forever!
                        </p>
                        <h3>Harberger Tax</h3>
                        <p>
                            The owner of an asset pays a <strong>harbeger tax</strong> which is a percentage of the selling price they stipulate.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

CoreConcepts.propTypes = {
};

export default CoreConcepts;