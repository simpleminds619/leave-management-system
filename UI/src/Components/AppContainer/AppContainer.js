import React, { Component } from 'react';
import { Layout, Icon, Popover, List } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './AppContainer.css';
import AppRoute from '../../routes';
import SideMenu from '../SideMenu/SideMenu';

const { Content, Header, Footer } = Layout;

class AppContainer extends Component {
    state = {
        collapsed: false,
        selectedKey: ['/']
    };
    render() {
        console.log(this);
        return (
            <div>
                <Router>
                    <Layout>
                        <SideMenu />
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0, textAlign: 'left' }}>
                                <div style={{ fontSize: 30, marginRight: 30, float: 'right', cursor: 'pointer' }}>
                                    <Popover trigger="click" placement="bottomLeft" arrowPointAtCenter content={
                                        <List size="small" >
                                            <List.Item>
                                                <span style={{ cursor: 'pointer', width: 100 }}>
                                                    <Icon type="user" style={{ paddingRight: 10 }} />
                                                    Profile
                                                </span>
                                            </List.Item>
                                            <List.Item>
                                                <span style={{ cursor: 'pointer' }}>
                                                    <Icon type="logout" style={{ paddingRight: 10 }} />
                                                    Logout
                                                </span>
                                            </List.Item>
                                        </List>
                                    }>
                                        <Icon type="user" />
                                    </Popover>
                                </div>
                            </Header>
                            <Content style={{ marginTop: '10px', background: '#fff', minHeight: 600 }}>
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