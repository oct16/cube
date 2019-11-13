import React, { Component } from 'react'

export default class NoMatchComponent extends Component {
    public render() {
        return (
            <div>
                <h3
                    style={{
                        textAlign: 'center',
                        width: '200px',
                        height: '2.4rem',
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto'
                    }}
                >
                    404 No Found
                </h3>
            </div>
        )
    }
}
