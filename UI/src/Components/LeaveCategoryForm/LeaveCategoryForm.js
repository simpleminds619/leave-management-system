import React, { Component } from 'react';
import { Form, Row, Col, Input, Select, InputNumber, Button } from 'antd';
import './LeaveCategoryForm.css';
const { Option } = Select;


class LeaveCategoryForm extends Component {
    render() {
        return (
            <div>
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Name">
                                <Input value={this.props.formData && this.props.formData.name} disabled={this.props.readonly} placeholder="Enter leave category name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Code">
                                <Input placeholder="Enter leave category code"
                                    value={this.props.formData && this.props.formData.code} disabled={this.props.readonly} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Total Leaves">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Enter total no.of leaves"
                                    min={0}
                                    value={this.props.formData && this.props.formData.totalLeaves} disabled={this.props.readonly}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Total Carry Forward Leaves">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Total no.of carry forward leaves"
                                    min={0}
                                    value={this.props.formData && this.props.formData.totalCarryFwdLeaves} disabled={this.props.readonly}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Carry Forward Leaves Limit">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Upper limit for carry forwaded leaves"
                                    min={0}
                                    value={this.props.formData && this.props.formData.upperLimitOfLeaves} disabled={this.props.readonly}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            {
                                (this.props.formData && this.props.formData.status) ?
                                    (<Form.Item label="Status">
                                        <Select
                                            value={this.props.formData && this.props.formData.status}
                                            disabled={this.props.readonly}>
                                            <Option value="In-Active">In-Active</Option>
                                            <Option value="Active">Active</Option>
                                        </Select>
                                    </Form.Item>) :
                                    (<Form.Item label="Status">
                                        <Select placeholder="Please select a status"
                                            disabled={this.props.readonly}>
                                            <Option value="In-Active">In-Active</Option>
                                            <Option value="Active">Active</Option>
                                        </Select>
                                    </Form.Item>)
                            }
                        </Col>
                    </Row>
                </Form>
                <div className="modalPopupFooter">
                    <Button onClick={this.props.onCancel} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={this.props.onSubmit} type="primary" disabled={this.props.readonly}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default LeaveCategoryForm;