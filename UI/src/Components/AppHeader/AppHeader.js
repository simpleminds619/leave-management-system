import {Layout, Menu} from 'antd';
import React from 'react';
const {Header} = Layout;
class AppHeader extends React.Component{
    render(){
        return(
            <Header>
                <Menu theme="dark" mode="horizontal" style={{lineHeight:'64px'}}>
                    <Menu.Item>Nav 1</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default AppHeader;