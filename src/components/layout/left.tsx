import React, { Component } from 'react'
import styles from './layout.module.styl'

export default class Left extends Component {
    public render() {
        return <div className={styles.left}>{this.props.children}</div>
    }
}
