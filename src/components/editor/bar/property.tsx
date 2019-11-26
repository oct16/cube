import { Button, Input } from 'antd'
import React, { Component } from 'react'
import { CNode } from '../../../interfaces/editor'
import PropertyForm from './property-form'

class PropertyBar extends Component {
    public render() {
        return (
            <div>
                <p>属性</p>
                <PropertyForm />
            </div>
        )
    }
}

export default PropertyBar
