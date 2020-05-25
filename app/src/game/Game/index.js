import React, { Component } from 'react'

import './styles.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            outerContainerEl: {},
        }
    }

    async componentDidMount() {
        const config = {
            id: 'runner',
            width: this.outerContainerEl.offsetWidth,
        }
        const { Runner } = await import('../Runner')
        const runner = new Runner(this.outerContainerEl, config)
        runner.init()
    }

    render() {
        return (
            <div
                ref={node => (this.outerContainerEl = node)}
                className="runner-wrapper"
            />
        )
    }
}

export default App
