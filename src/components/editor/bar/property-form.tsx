import { CNode } from '@/interfaces/editor'
import { updateNodeInNodes } from '@/redux/actions'
import { Button, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import cn from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import styles from '../editor.module.styl'

interface IProps {
    selectNode: CNode
    nodes: CNode[]
    updateSelectNode: any
}
type IFormProps = FormComponentProps & IProps

class PropertyForm extends React.Component<IFormProps> {
    public handleSubmit = e => {
        e.preventDefault()
        const { selectNode, form, updateSelectNode } = this.props

        const values = form.getFieldsValue()

        updateSelectNode({
            ...selectNode,
            ...values
        })

        // form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values)
        //     }
        // })
    }

    // public handleSelectChange = value => {
    //     this.props.form.setFieldsValue({
    //         note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
    //     })
    // }

    public render() {
        const { selectNode, form } = this.props
        const { getFieldDecorator } = form
        const { attr, children } = selectNode

        return (
            <div className={cn(styles.propertyForm, 'px-2')}>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    {attr &&
                        Object.entries(attr).map(([key, val]) => {
                            return (
                                <Form.Item key={key} label={key}>
                                    {getFieldDecorator(`attr[${key}]`, {
                                        initialValue: val
                                    })(<Input />)}
                                </Form.Item>
                            )
                        })}
                    {children &&
                        children.map((val, index) => {
                            if (typeof val === 'string') {
                                return (
                                    <Form.Item key={index} label={'Text'}>
                                        {getFieldDecorator(`children[${index}]`, {
                                            initialValue: val
                                        })(<Input />)}
                                    </Form.Item>
                                )
                            }
                        })}

                    {/* <Form.Item label="Gender">
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: 'Please select your gender!' }]
                        })(
                            <Select
                                placeholder="Select a option and change input text above"
                                onChange={this.handleSelectChange}
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                            </Select>
                        )}
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state: { select: { selectNode: CNode }; nodes: { nodes: CNode[] } }) => {
    return { ...state.select, ...state.nodes }
}

const mapDispatchToProps = dispatch => ({
    updateSelectNode: (node: CNode) => dispatch(updateNodeInNodes(node))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create<IFormProps>({ name: 'propertyForm' })(PropertyForm))
