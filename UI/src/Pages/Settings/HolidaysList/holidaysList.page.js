import React, { Component } from 'react';
import { Table, Icon, Button, Drawer, Modal } from 'antd';
import _ from 'lodash';
import HolidayForm from '../../../Components/HolidayForm/HolidayForm';

class HolidaysList extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    state = {
        holidaysList: [],
        locationsList: [],
        filteredInfo: null,
        isFormDrawerVisible: false,
        selectedHoliday: null
    }

    componentDidMount() {
        this.props.fetchHolidaysListAsync();
        if (this.props.isAjaxProcessing === false) {
            this.setState({
                holidaysList: this.props.holidays
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isAjaxProcessing === true && this.props.isAjaxProcessing === false && this.props.holidays) {
            this.setState({
                holidaysList: this.props.holidays
            });
        }
        else if (prevProps.isLocationsListLoading === true && this.props.isLocationsListLoading === false && this.props.locations) {
            this.setState({
                locationsList: this.props.locations,
                isFormDrawerVisible: true
            });
        }
        else if (prevProps.isAjaxProcessing === true && this.props.isAjaxProcessing === false && this.props.createHolidayResponse) {
            this.setState({
                selectedLeaveCategory: this.props.createHolidayResponse,
                isFormDrawerVisible: false
            });
            this.props.fetchHolidaysListAsync();
        }
        else if (prevProps.isAjaxProcessing === true && this.props.isAjaxProcessing === false && this.props.updateHolidayResponse) {
            this.setState({
                selectedLeaveCategory: this.props.createHolidayResponse,
                isFormDrawerVisible: false
            });
            this.props.fetchHolidaysListAsync();
        }
        else if (prevProps.isAjaxProcessing === true && this.props.isAjaxProcessing === false && this.props.deleteHolidayResponse) {
            this.props.fetchHolidaysListAsync();
        }
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
            selectedHoliday: record
        });
    }

    addNewHoliday = () => {
        this.props.fetchLocationsAsync();
        if (this.props.isAjaxProcessing === false) {
            this.setState({
                isFormDrawerVisible: true
            });
        }
    };

    handleSubmit = (holiday) =>{
        console.log("holiday",holiday);
        if(!holiday.id){
            console.log("creating...")
            this.props.createHolidayAsync(holiday);
        }
        else{
            this.props.updateHolidayAsync(holiday);
        }
    }

    handleEdit = () =>{
        this.props.fetchLocationsAsync();
        if(this.props.isAjaxProcessing === false){
            setTimeout(() => {
                this.setState({
                    isFormDrawerVisible: true,
                });
            }, 10);
        }        
    }

    handleDelete = () =>{
        setTimeout(() => {
            Modal.confirm({
                title:'Delete Holiday',
                content:'Are you sure to delete '+this.state.selectedHoliday.reason+' ?',
                okText:'Delete',
                cancelText:'Cancel',
                onOk:()=>{
                    this.props.deleteHolidayAsync(this.state.selectedHoliday.id);
                },
                okButtonProps:{
                    type:'primary',
                    style:{
                        backgroundColor:'red',
                        color:'white'
                    }
                }
            })
        }, 10);
    }


    render() {
        let { filteredInfo } = this.state;
        filteredInfo = filteredInfo || {};
        let uniqueYears = _.map(this.state.holidaysList, 'year').filter(this.unique); //;
        let yearFilterOptions = _.map(uniqueYears, (year) => {
            return {
                'text': year,
                'value': year
            };
        });
        let uniqueLocations = _.map(this.state.holidaysList, 'location').filter(this.unique);
        let locationFilterOptions = _.map(uniqueLocations, (location) => {
            return {
                'text': location.name,
                'value': location.name
            };
        });

        const columns = [
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year',
                align: 'center',
                filters: yearFilterOptions,
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
                onFilter: (value, record) => record.location.name.includes(value),
                render: (text) => {
                    return text.name
                }
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
                render: (text) => {
                    return text.substring(0, 10)
                }
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
                        <Icon type="edit" onClick={this.handleEdit} style={{ fontSize: 20, color: 'blue', margin: 10, cursor: 'pointer' }} />
                        <Icon type="delete" onClick={this.handleDelete} style={{ fontSize: 20, color: 'red', margin: 10, cursor: 'pointer' }} />
                    </div>
                ),
                align: 'center',
            }
        ]

        return (
            <div style={{ padding: 50 }}>
                <Table
                    size="small"
                    rowKey={(row) => row.id}
                    columns={columns}
                    dataSource={this.state.holidaysList}
                    loading={this.props.isAjaxProcessing}
                    bordered
                    title={() => (<div style={{ fontSize: 18, fontWeight: 'bolder', color: '#031e47' }}>Holidays List</div>)}
                    pagination={{ pageSize: 5 }}
                    onRow={(record) => ({
                        onClick: () => {
                            this.setSelectedRow(record);
                        }
                    })}
                    onChange={this.handleChange}
                />
                <div style={{ marginTop: 25 }}>
                    <Button type="default" style={{ marginRight: 15 }} onClick={this.clearFilters}>
                        Clear Filters
                    </Button>
                    <Button type="primary" onClick={this.addNewHoliday} style={{ marginLeft: 15 }}>
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
                        <HolidayForm onSubmit={this.handleSubmit}
                            onCancel={this.onClose}
                            locationList={this.state.locationsList}
                            isReadOnlyForm={false}
                            formData={this.state.selectedHoliday} />
                    </Drawer>
                </div>
            </div>
        );
    }
}

export default HolidaysList;