import React, { Component } from 'react';
import { Table, Icon, Button, Drawer, Modal } from 'antd';
import LeaveCategoryForm from '../../../Components/LeaveCategoryForm/LeaveCategoryForm';
import './leavecategories.page.css';

class LeaveCategories extends Component {
    state = {
        isFormDrawerVisible: false,
        leaveCategories: [],
        isLoading: true,
        selectedLeaveCategory: null,
        isReadOnlyForm: false
    }

    onView = () => {
        setTimeout(() => {
            this.setState({
                isReadOnlyForm: true,
                isFormDrawerVisible: true,
            });
        }, 10);
    }

    onEdit = () => {
        setTimeout(() => {
            this.setState({
                isReadOnlyForm: false,
                isFormDrawerVisible: true,
            });
        }, 10);
    }

    onDelete = () =>{
        setTimeout(() => {
            Modal.confirm({
                title:'Delete Leave Category',
                content:'Are you sure to delete '+this.state.selectedLeaveCategory.name+' ?',
                okText:'Delete',
                cancelText:'Cancel',
                onOk:()=>{
                    console.log("You deleted the item");
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

    columns = [
        {
            title: 'Category Id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Total Leaves',
            dataIndex: 'totalLeaves',
            align: 'center',
        },
        {
            title: 'Total Carry Forward Leaves',
            dataIndex: 'totalCarryFwdLeaves',
            align: 'center',
        },
        {
            title: 'Upper Limit',
            dataIndex: 'upperLimitOfLeaves',
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
                    <Icon type="eye" onClick={this.onView} style={{ fontSize: 20, color: 'black', margin: 10, cursor: 'pointer' }} />
                    <Icon type="edit" onClick={this.onEdit} style={{ fontSize: 20, color: 'blue', margin: 10, cursor: 'pointer' }} />
                    <Icon type="delete" onClick={this.onDelete} style={{ fontSize: 20, color: 'red', margin: 10, cursor: 'pointer' }} />
                </div>
            ),
            align: 'center',
        }
    ]

    componentDidMount() {
        this.props.fetchLeaveCategoriesAsync();
        if (this.props.isLoading === false) {
            this.setState({
                leaveCategories: this.props.leaveCategories,
                isLoading: this.props.isLoading
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.isLoading === false && prevProps.isLoading === true) ||
            (this.state.isLoading === false && prevState.isLoading === true)) {
            this.setState({
                leaveCategories: this.props.leaveCategories,
                isLoading: this.props.isLoading
            });
        }
    }

    createNewCategory = () => {
        this.setState({
            isFormDrawerVisible: true,
            selectedLeaveCategory: null,
            isReadOnlyForm: false
        });
    };

    onClose = () => {
        this.setState({
            isFormDrawerVisible: false,
        });
    };

    setSelectedRow = (record) => {
        this.setState({
            selectedLeaveCategory: record
        });
    }

    render() {
        return (
            <div style={{ padding: 50 }}>
                <Table
                    size="small"
                    rowKey={(row) => row.id}
                    columns={this.columns}
                    dataSource={this.state.leaveCategories}
                    loading={this.state.isLoading}
                    bordered
                    title={() => (<div style={{ fontSize: 18, fontWeight: 'bolder', color: '#031e47' }}>Leave Categories</div>)}
                    pagination={false}
                    onRow={(record) => ({
                        onClick: () => {
                            this.setSelectedRow(record);
                        }
                    })}
                />
                <div style={{ marginTop: 25 }}>
                    <Button type="primary" onClick={this.createNewCategory}>
                        <Icon type="plus" /> New Category
                    </Button>
                    <Drawer
                        title={this.state.selectedLeaveCategory ? "Leave Category" : "New Leave Category"}
                        width={500}
                        onClose={this.onClose}
                        visible={this.state.isFormDrawerVisible}
                        style={{
                            overflow: 'auto',
                            height: 'calc(100% - 108px)',
                            paddingBottom: '108px',
                        }}
                        destroyOnClose={true}
                    >
                        <LeaveCategoryForm onCancel={this.onClose}
                            onSubmit={this.onClose}
                            readonly={this.state.isReadOnlyForm}
                            formData={this.state.selectedLeaveCategory} />
                    </Drawer>
                </div>
            </div>
        );
    }
}

export default LeaveCategories;