import React, { Component } from 'react';
import { Table, Icon } from 'antd';

class LocationsPage extends Component {
    state = {
        locations: []
    }

    columns = [
        {
            title: 'Location Id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
            render: (text) => (
                text === 'Active' ?
                    <Icon type="check-circle" style={{ color: 'green', fontSize: 16 }} />
                    : <Icon type="close-circle" style={{ color: 'red', fontSize: 16 }} />
            )
        }
    ]

    componentDidMount(){
        this.props.fetchLocationsAsync();
        if(!this.props.isLoading){
            this.setState({locations: this.props.locations});
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.isLoading === true && this.props.isLoading === false && this.props.locations){
            if(!this.props.isLoading){
                this.setState({locations: this.props.locations});
            }
        }
    }

    render() {
        return (
            <div style={{padding:50}}>
                <Table
                    size="small"
                    rowKey={(row) => row.id}
                    columns={this.columns}
                    dataSource={this.state.locations}
                    loading={this.props.isLoading}
                    bordered
                    title={() => (<div style={{ fontSize: 18, fontWeight: 'bolder', color: '#031e47' }}>Company Locations</div>)}
                    pagination={false}
                />
            </div>
        );
    }
}

export default LocationsPage;