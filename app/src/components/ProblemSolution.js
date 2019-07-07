
import React, { PropTypes, Component } from 'react';
import gorillaOnVine from '../img/wildcardsimages/gorilla-on-vine.png'

class ProblemSolution extends Component {
    render() {
        return (
            <div className='problem-solution-container vine-background'>
                <div className='gorilla-on-vine'>
                    <img src={gorillaOnVine} width='100%' />
                </div>
                <div className='problem-solution-content-container'>
                    <div className='problem-solution-content'>
                        <h3>Problem</h3>
                        <p>
                            Wildlife conservation is currently based on a donation only model which is not sustainable. Contributions are made once off and forgotten about.
                        </p>
                        <h3>Solution</h3>
                        <p>
                            Wildcards allows individuals to transparently and easily ‘adopt’ an endangered animal and contribute to sustainability through a fun and engaging platform.

                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

ProblemSolution.propTypes = {
};

export default ProblemSolution;