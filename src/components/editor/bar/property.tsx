import { Button, Input } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CNode } from '../../../interfaces/editor'

function getNodeInfo(node: CNode) {
    const { tag, attr, children } = node

    switch (tag) {
        case 'Button':
        case 'Text':
            return (
                <div>
                    <p>{tag}</p>

                    {Object.entries(attr).map(([key, value]) => {
                        return (
                            <p key={key}>
                                {key}
                                <Input defaultValue={value.toString()} />
                            </p>
                        )
                    })}

                    <p>
                        html
                        <Input defaultValue={children.toString()} />
                    </p>
                </div>
            )

        default:
            break
    }
    return <div>property</div>
}

class PropertyBar extends Component<{ selectNode: CNode }> {
    public state: CNode
    constructor(props) {
        super(props)
        this.state = this.props.selectNode
    }

    public componentWillReceiveProps(props) {
        this.setState(props.selectNode)
    }
    public saveHandle() {
        console.log(this.state)
    }

    public render() {
        return (
            <div>
                <p>属性</p>
                {getNodeInfo(this.state)}
                <Button onClick={this.saveHandle.bind(this)}>Save</Button>
            </div>
        )
    }
}

const mapStateToProps = (state: { select: { selectNode: CNode } }) => {
    return state.select
}

export default connect(mapStateToProps)(PropertyBar)
