import React, { Component } from 'react';
import { Menu, Layout, Icon } from 'antd';
import { Link,  withRouter } from 'react-router-dom';
import './SideMenu.css';
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component {
    state = {
        collapsed: false
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    
    render() {
        const { location } = this.props;
        return (
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
                <Menu theme="dark" mode="inline" inlineCollapsed={this.state.collapsed} selectedKeys={[location.pathname]} defaultSelectedKeys={['/']}>
                    <Menu.Item key="/" style={{ textAlign: 'left' }}>
                        <Icon type="home" theme="filled" />
                        <span>Home</span>
                        <Link to="/" />
                    </Menu.Item>
                    <Menu.Item key="/leaves" style={{ textAlign: 'left' }}>
                        <Icon type="mail" theme="filled" />
                        <span>Leaves</span>
                        <Link to="/leaves" />
                    </Menu.Item>
                    <SubMenu key="settings" style={{ marginLeft: this.state.collapsed ? 0 : -70 }} title={<span><Icon type="setting" theme="filled" /><span>Settings</span></span>}>
                        <Menu.Item key="/holidayslist">     
                            <Icon type="bars" />                           
                            <span>Holidays List</span>
                            <Link to="/holidayslist" />
                        </Menu.Item>
                        <Menu.Item key="/leaveCategories">  
                            <Icon type="bars" />                               
                            <span>Leave Categories</span>
                            <Link to="/leaveCategories" />
                        </Menu.Item>
                        <Menu.Item key="/locations">   
                            <Icon type="bars" />                         
                            <span>Locations</span>
                            <Link to="/locations" />
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SideMenu);