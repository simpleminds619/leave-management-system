import React, { Component } from 'react';
import { Menu, Layout, Icon, Popover, List } from 'antd';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './AppContainer.css';
import AppRoute from '../../routes';

const { Content, Sider, Header, Footer } = Layout;

class AppContainer extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Layout>
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={this.state.collapsed}
                        >
                            <div className="logo">
                                <Icon
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                    style={{ fontSize: '18px', paddingRight: '10px', paddingLeft: this.state.collapsed ? '10px' : '0px', cursor: 'pointer', transition: 'color .3s' }}
                                    theme="outlined"
                                />
                                <div style={{ visibility: this.state.collapsed ? 'hidden' : 'visible' }}>L M S</div>
                            </div>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
                                <Menu.Item key="home" style={{ textAlign: 'left' }}>
                                    <Icon type="home" theme="filled" />
                                    <span>Home</span>
                                    <Link to="/" />
                                </Menu.Item>
                                <Menu.Item key="leaves" style={{ textAlign: 'left' }}>
                                    <Icon type="mail" theme="filled" />
                                    <span>Leaves</span>
                                    <Link to="/about" />
                                </Menu.Item>
                                <Menu.Item key="settings" style={{ textAlign: 'left' }}>
                                    <Icon type="setting" theme="filled" />
                                    <span>Settings</span>
                                    <Link to="/contact" />
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0, textAlign: 'left' }}>
                                <div style={{fontSize:30,marginRight:30,float:'right', cursor:'pointer' }}>                                   
                                    <Popover trigger="click" placement="bottomLeft" arrowPointAtCenter content={
                                        <List size="small" >
                                            <List.Item>
                                                <span style={{cursor:'pointer',width:100}}>
                                                    <Icon type="user" style={{paddingRight:10}} />
                                                    Profile
                                                </span>
                                            </List.Item>
                                            <List.Item>
                                                <span style={{cursor:'pointer'}}>
                                                    <Icon type="logout" style={{paddingRight:10}} />
                                                    Logout
                                                </span>
                                            </List.Item>
                                        </List>
                                    }>
                                        <Icon type="user" />
                                    </Popover>
                                </div>                               
                            </Header>
                            <Content style={{ marginTop: '24px',background: '#fff', minHeight: 600 }}>
                                <AppRoute />
                            </Content>
                            <Footer>
                                Leave Management System
                            </Footer>
                        </Layout>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default AppContainer;