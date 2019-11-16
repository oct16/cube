import { Icon, Menu } from 'antd'
import React, { Component } from 'react'
const { SubMenu } = Menu
export default class Toolbar extends Component {
    public handleClick = e => {
        console.log('click ', e)
    }
    public drag = e => {
        const type = (e.target as HTMLElement).attributes['v-type'].value
        e.dataTransfer.setData('type', type)
    }

    public render() {
        return (
            <Menu
                onClick={this.handleClick}
                style={{ height: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="mail" />
                            <span>基础元素</span>
                        </span>
                    }
                >
                    <Menu.ItemGroup key="g1" title="容器">
                        <Menu.Item key="1">
                            <div
                                style={{ width: '60px' }}
                                draggable={true}
                                onDragStart={this.drag}
                                // onDragOver={this.drag}
                                // onDragEnd={this.drag}
                                v-type="Container"
                            >
                                Container
                            </div>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <div style={{ width: '60px' }} draggable={true} onDragStart={this.drag} v-type="Col">
                                Col
                            </div>
                        </Menu.Item>
                        <Menu.Item key="22">
                            <div style={{ width: '60px' }} draggable={true} onDragStart={this.drag} v-type="Col6">
                                Col-6
                            </div>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <div style={{ width: '60px' }} draggable={true} onDragStart={this.drag} v-type="Input">
                                Input
                            </div>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <div style={{ width: '60px' }} draggable={true} onDragStart={this.drag} v-type="Button">
                                Button
                            </div>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        )
    }
}
