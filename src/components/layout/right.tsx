import React, { Component } from 'react'

import styles from './layout.module.styl'

export default class Right extends Component {
    public render() {
        return <div className={styles.right}>{this.props.children}</div>
    }
}
