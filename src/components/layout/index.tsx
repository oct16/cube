import React from 'react'
import { Route } from 'react-router-dom'
import Footer from './footer'
import Header from './header'
import styles from './layout.module.styl'

const DefaultLayout = ({ component: C, ...rest }) => {
    return (
        <Route
            {...rest}
            render={matchProps => (
                <div className={styles.defaultLayout}>
                    <Header />
                    <div className={styles.content}>
                        <C {...matchProps} />
                    </div>
                    <Footer />
                </div>
            )}
        ></Route>
    )
}
export default DefaultLayout
