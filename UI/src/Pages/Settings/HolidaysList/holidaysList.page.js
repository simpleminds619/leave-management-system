import React, { Component } from 'react';
import { Table, Icon, Button, Drawer } from 'antd';
import holidaysList from '../../../data/holidaysList';
import _ from 'lodash';
import HolidayForm from '../../../Components/HolidayForm/HolidayForm';

class HolidaysList extends Component {
    state = {
        holidaysList: [],
        filteredInfo: null,
        isFormDrawerVisible: false,
        selectedHoliday: null
    }

    unique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters
        });
    }

    onClose = () => {
        this.setState({
            isFormDrawerVisible: false,
        });
    };
    
    clearFilters = () => {
        this.setState({ filteredInfo: null });
    }

    setSelectedRow = (record) => {
        this.setState({
            selectedLeaveCategory: record
        });
    }

    addNewHoliday = () => {
        this.setState({
            isFormDrawerVisible: true
        });
    };

    render() {
        let {  filteredInfo } = this.state;
        filteredInfo = filteredInfo || {};
        let uniqueYears = _.map(holidaysList,'year').filter(this.unique); //;
        let yearFilterOptions = _.map(uniqueYears,(year)=>{
            return {
                'text':year, 
                'value':year
            };
        });
        let uniqueLocations = _.map(holidaysList,'location').filter(this.unique);
        let locationFilterOptions = _.map(uniqueLocations,(location)=>{
            return{
                'text':location,
                'value':location
            };
        });
        
        const columns = [
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year',
                align:'center',
                filters:yearFilterOptions,
                filteredValue: filteredInfo.year || null,
                onFilter: (value, record) => record.year === value
            },
            {
                title: 'Location',
                dataIndex: 'location',
                key: 'location',
                align: 'center',
                filters: locationFilterOptions,
                filteredValue: filteredInfo.location || null,
                onFilter: (value, record) => record.location.includes(value)
            },
            {
                title: 'Reason',
                dataIndex: 'reason',
                align: 'center',
            },
            {
                title: 'Effective Date',
                dataIndex: 'effectiveDate',
                align: 'center',
            },
            {
                title: 'Day',
                dataIndex: 'day',
                align: 'center',
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
            },
            {
                title: 'Actions',
                render: () => (
                    <div style={{ fontSize: 16 }}>
                        <Icon type="eye" style={{ fontSize: 20, color: 'black', margin: 10, cursor: 'pointer' }} />
                        <Icon type="edit" style={{ fontSize: 20, color: 'blue', margin: 10, cursor: 'pointer' }} />
                        <Icon type="delete" style={{ fontSize: 20, color: 'red', margin: 10, cursor: 'pointer' }} />
                    </div>
                ),
                align: 'center',
            }
        ]

        return (
            <div style={{padding:50}}>
                <Table
                    size="small"
                    rowKey={(row) => row.id}
                    columns={columns}
                    dataSource={holidaysList}
                    //loading={this.props.isAjaxProcessing}
                    bordered
                    title={() => (<div style={{ fontSize: 18, fontWeight: 'bolder', color: '#031e47' }}>Holidays List</div>)}
                    pagination={{pageSize:5}}
                    onRow={(record) => ({
                        onClick: () => {
                            this.setSelectedRow(record);
                        }
                    })}
                    onChange={this.handleChange}
                />
                <div style={{ marginTop: 25 }}>
                    <Button type="default" style={{marginRight:15}} onClick={this.clearFilters}>
                         Clear Filters
                    </Button>
                    <Button type="primary" onClick={this.addNewHoliday} style={{marginLeft:15}}>
                        <Icon type="plus" /> Add Holiday
                    </Button>
                    <Drawer title="Holiday Details"
                        width={500}
                        onClose={this.onClose}
                        visible={this.state.isFormDrawerVisible}
                        style={{
                          overflow: 'auto',
                          height: 'calc(100% - 108px)',
                          paddingBottom: '108px',
                        }}
                        destroyOnClose={true}>
                        <HolidayForm onSubmit={this.onClose} 
                                    onCancel={this.onClose}
                                    locationList={uniqueLocations}
                                    isReadOnlyForm={false}
                                    formData={this.state.selectedHoliday}/>
                    </Drawer>
                </div>
            </div>
        );
    }
}

export default HolidaysList;