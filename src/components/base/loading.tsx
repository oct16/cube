import loadingImg from '@/assets/images/loading.svg'
import React, { Component } from 'react'
export default class Loading extends Component<any> {
    public render() {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <img style={{ width: '80px' }} src={loadingImg} alt="loading" />
            </div>
        )
    }
}
