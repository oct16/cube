import { Button, Form, Icon, Input } from 'antd'
import React, { Component } from 'react'
import ElWrap from '../el-wrap'
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

class HorizontalLoginForm extends React.Component<any, any> {
    public componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields()
    }

    public handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username')
        const passwordError = isFieldTouched('password') && getFieldError('password')
        return (
            <ElWrap {...this.props}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </ElWrap>
        )
    }
}

export const HForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm)
