import React, { Component } from 'react';
import { Table, Button, Icon, Tooltip, Drawer } from 'antd';
import LeaveApplicationForm from '../../Components/LeaveApplicationForm/LeaveApplicationForm';

class LeavesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaves: [],
            leaveBank: [],
            leaveCategories: [],
            isApplyLeaveFormDrawerVisible: false,
            selectedLeave:null,
            holidaysList: []
        }
    }
    componentDidMount() {
        this.props.fetchLeaveHistoryAsync(1); //TODO: Replace it with loggedin userId
        this.props.fetchLeaveCategoriesAsync();
        this.props.fetchLeaveBankDataAsync(1);
        this.props.fetchHolidaysListAsync();   
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isLoading === true && this.props.isLoading === false && this.props.leaves && this.props.leaveCategories) {
            this.setState({
                leaves: this.props.leaves,
                leaveCategories: this.props.leaveCategories
            });
        }
        
        if (prevProps.isLeaveBankDataLoading === true && this.props.isLeaveBankDataLoading === false && this.props.leaveBankResponse) {
            this.setState({
                leaveBank: this.props.leaveBankResponse
            });
        }
        if (prevProps.isHolidaysListLoading === true && this.props.isHolidaysListLoading === false && this.props.holidaysList) {
            console.log("setting holidayslist", this.props.holidaysList)
            this.setState({
                holidaysList: this.props.holidaysList
            });
        }

        if(prevProps.isLoading === true && this.props.isLoading === false && this.props.applyLeaveResponse && this.props.applyLeaveResponse.id !== 0){
            this.setState({
                isApplyLeaveFormDrawerVisible:false
            })
            this.props.fetchLeaveHistoryAsync(1);
            this.props.fetchLeaveBankDataAsync(1);
        }
    }

    applyLeave = ()=>{
        
        this.setState({
            isApplyLeaveFormDrawerVisible:true
        });
    }

    onClose = () => {
        this.setState({
            isApplyLeaveFormDrawerVisible: false,
        });
    };

    handleSubmit = (leave) =>{
        this.props.applyLeaveAsync({...leave,userId:1,status:'InProgress'});
    }

    renderLeaveHistorySection = () => {
        const columns = [
            {
                title: 'Request Id',
                dataIndex: 'id',
                align: 'center',
            },
            {
                title: 'Category',
                dataIndex: 'categoryId',
                align: 'center',
                render: (text) => {
                    var category = this.state.leaveCategories.filter((category) => {
                        return category.id === parseInt(text)
                    });
                    return category && category[0] ? category[0].name : '';
                }
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                align: 'center',
                render: (text) => {
                    return text.substring(0, 10)
                }
            },
            {
                title: 'End Date',
                dataIndex: 'endDate',
                align: 'center',
                render: (text) => {
                    return text.substring(0, 10)
                }
            },
            {
                title: 'Status',
                dataIndex: 'status',
                align: 'center',
                render: (text) => (
                    text === 'InProgress' ? <Tooltip placement="left" title={text}> <Icon type="warning" style={{ color: 'yellow', fontSize: 16 }} /> </Tooltip>
                        : text === 'Approved' ? <Tooltip placement="left" title={text}> <Icon type="check-circle" style={{ color: 'green', fontSize: 16 }} /></Tooltip>
                        : <Tooltip placement="left" title={text}><Icon type="close-circle" style={{ color: 'red', fontSize: 16 }} /></Tooltip>
                )
            }
        ];
        return (
            <div>
                <Table
                    size="small"
                    rowKey={(row) => row.id}
                    columns={columns}
                    dataSource={this.state.leaves}
                    loading={this.props.isLoading}
                    bordered
                    expandedRowRender={record=><p style={{ margin: 0 }}>Reason: {record.reason}</p>}
                    title={() => (<div style={{ fontSize: 18, fontWeight: 'bolder', color: '#031e47' }}>Leave History</div>)}
                    pagination={{ pageSize: 5 }}
                />
                <div>
                <Button type="primary" onClick={this.applyLeave} style={{ marginLeft: 15 }}>
                    <Icon type="plus" /> Apply Leave
                </Button>
                <Drawer title="Leave Details"
                        width={500}
                        onClose={this.onClose}
                        visible={this.state.isApplyLeaveFormDrawerVisible}
                        style={{
                            overflow: 'auto',
                            height: 'calc(100% - 108px)',
                            paddingBottom: '108px',
                        }}
                        destroyOnClose={true}>
                        <LeaveApplicationForm onSubmit={this.handleSubmit}
                            leaveCategories={this.state.leaveCategories}
                            onCancel={this.onClose}
                            isReadOnlyForm={false}
                            formData={this.state.selectedLeave}
                            holidaysList={this.state.holidaysList.filter(h=>h.status === 'Active')}
                        />
                    </Drawer>
                </div>
            </div>
        );
    }

    renderLeaveBankSection = () => {
        const columns = [
            {
                title: 'Leave Category',
                dataIndex: 'categoryName',
                align: 'center',
            },
            {
                title: 'Total YTD Leaves Availed',
                dataIndex: 'totalCurrentYearLeaves',
                align: 'center',
            },
            {
                title: 'Total Leaves Availed',
                dataIndex: 'totalLeavesAvailed',
                align: 'center',
            },
            {
                title: 'Total Available Leaves',
                dataIndex: 'totalAvailableLeaves',
                align: 'center',
            },
            {
                title: 'Upper Limit',
                dataIndex: 'upperLimit',
                align: 'center',
            }
        ]

        return (            
            <Table
                size="small"
                rowKey={(row) => row.id}
                columns={columns}
                dataSource={this.state.leaveBank}
                loading={this.props.isLoading}
                bordered                   
                title={() => (<div style={{ fontSize: 18, fontWeight: 'bolder', color: '#031e47' }}>Leave Bank</div>)}
                pagination={{ pageSize: 5 }}
            />            
        );
    }

    render() {
        return (
            <div>
                <div style={{ padding: 25 }}>
                    {
                        this.renderLeaveHistorySection()
                    }
                </div>
                <div style={{padding: 25 }}>
                    {
                        this.renderLeaveBankSection()
                    }
                </div>
            </div>
        );
    }
}

export default LeavesPage;