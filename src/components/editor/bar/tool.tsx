import cn from 'classnames'
import React, { Component } from 'react'
import styles from '../editor.module.styl'

export default class Toolbar extends Component {
    public render() {
        return (
            <div className={cn(styles.toolbar, 'd-flex', 'justify-content-end')}>
                <div className="px-3">preview</div>
            </div>
        )
    }
}
