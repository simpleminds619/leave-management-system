import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, InputNumber, Select, DatePicker, Button } from 'antd';
import './HolidayForm.css';
import _ from 'lodash';
const { Option } = Select;

class HolidayForm extends PureComponent {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onSubmit(values);
            }
        });
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        let locationOptions = _.map(this.props.locationList,(value)=>(
            <Option key={value} value={value}>{value}</Option>
        ));
        let currentYear = (new Date()).getFullYear();
        return (
            <div>
                <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Reason :">
                                {getFieldDecorator('reason', {
                                    rules: [{ required: true, message: 'Required!' },
                                    { whitespace: true, message: 'Required!' }
                                    ]
                                })(
                                    <Input placeholder="Reason for the Holiday" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Year :">
                                {getFieldDecorator('year', {
                                    rules: [{ required: true, message: 'Required!' }
                                    ],
                                    initialValue: currentYear
                                })(
                                    <InputNumber min={1990} placeholder="YYYY" style={{ width: '100%' }} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Location :">
                                {getFieldDecorator('location', {
                                    rules: [{ required: true, message: 'Required!' }]
                                })(
                                    <Select placeholder="Select Location">
                                    {
                                        locationOptions
                                    }
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Date :">
                                {getFieldDecorator('effectiveDate', {
                                    rules: [{required:true, message:'Required!'}]
                                })(
                                    <DatePicker placeholder="Select Holiday date" style={{ width: '100%' }} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Status :">
                                {
                                    getFieldDecorator('status', {
                                        rules: [
                                            { required: true, message: "Requried!" }
                                        ],
                                        initialValue: 'Active'
                                    })(
                                        <Select disabled={this.props.readonly}>
                                            <Option value="InActive">InActive</Option>
                                            <Option value="Active">Active</Option>
                                        </Select>)
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="modalPopupFooter">
                        <Form.Item style={{marginRight:15}}>
                            <Button onClick={this.props.onCancel}>
                                Close
                            </Button>
                        </Form.Item>
                        <Form.Item style={{marginLeft:15}}>
                            <Button disabled={!this.props.form.isFieldsTouched() || this.props.readonly}
                                type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'holidayForm' })(HolidayForm);