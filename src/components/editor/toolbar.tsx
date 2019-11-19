import { Icon, Menu } from 'antd'
import React, { Component } from 'react'
const { SubMenu } = Menu
export default class Toolbar extends Component {
    public state = {
        menus: [
            {
                title: '基础元素',
                subMenus: [
                    {
                        title: '容器',
                        subMenus: [
                            {
                                type: 'Container',
                                title: 'Container'
                            },
                            {
                                type: 'Col',
                                title: 'Col'
                            },
                            {
                                type: 'Col6',
                                title: 'Col-6'
                            }
                        ]
                    },
                    {
                        title: '组件',
                        subMenus: [
                            {
                                type: 'Button',
                                title: 'Button'
                            },
                            {
                                type: 'Input',
                                title: 'Input'
                            }
                        ]
                    },
                    {
                        title: '数据展示',
                        subMenus: [
                            {
                                type: 'Table',
                                title: 'Table'
                            },
                            {
                                type: 'HForm',
                                title: 'HForm'
                            }
                        ]
                    }
                ]
            }
        ]
    }
    public handleClick = e => {
        return
        console.log('click ', e)
    }
    public onDragStart(e: any) {
        const type = (e.target as HTMLElement).attributes['v-type'].value
        e.dataTransfer!.setData('add', type)
    }

    public render() {
        return (
            <Menu
                onClick={this.handleClick}
                style={{ height: '100%' }}
                defaultSelectedKeys={[]}
                defaultOpenKeys={[this.state.menus[0].title]}
                mode="inline"
            >
                {this.state.menus.map((item, index) => {
                    return (
                        <SubMenu
                            key={item.title}
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {item.subMenus.map((itemLevel1, indexLevel1) => {
                                return (
                                    <Menu.ItemGroup key={indexLevel1} title={itemLevel1.title}>
                                        {itemLevel1.subMenus.map((itemLevel2, indexLevel2) => {
                                            return (
                                                <Menu.Item key={itemLevel1.title + indexLevel2}>
                                                    <div
                                                        style={{ width: '60px' }}
                                                        draggable={true}
                                                        onDragStart={this.onDragStart}
                                                        v-type={itemLevel2.title}
                                                    >
                                                        {itemLevel2.title}
                                                    </div>
                                                </Menu.Item>
                                            )
                                        })}
                                    </Menu.ItemGroup>
                                )
                            })}
                        </SubMenu>
                    )
                })}
            </Menu>
        )
    }
}
