import cn from 'classnames'
import React, { Component } from 'react'
import styles from './index.module.css'

export default class Header extends Component {
    public render() {
        return (
            <header className={cn('d-flex', 'justify-content-center', 'align-items-center', styles.header)}>
                <span>header</span>
            </header>
        )
    }
}
