import React, { Component } from 'react'
import styles from './index.module.css'

export default class Left extends Component {
    public render() {
        return <div className={styles.left}>{this.props.children}</div>
    }
}
