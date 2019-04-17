import React, { Component } from 'react';
import { Form, Row, Col, Input, InputNumber, Select, DatePicker, Button } from 'antd';
import './LeaveApplicationForm.css';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

class LeaveApplicationForm extends Component {

    componentDidMount(){
        let { formData } = this.props;
        console.log(formData);
        if (formData) {
            this.props.form.setFieldsValue({
                categoryId: formData.categoryId,
                reason: formData.reason,
                startDate: moment(formData.startDate),
                endDate: moment(formData.endDate),
                id: formData.id
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.startDate = values.startDate.format('YYYY-MM-DD');
                values.endDate = values.endDate.format('YYYY-MM-DD');
                console.log(values);
                this.props.onSubmit(values);
            }
        });
    }

    validateEndDate = (rule, value, callback) => {
        const form = this.props.form;
        if (value && moment(value) < moment(form.getFieldValue('startDate'))) {
            callback("End date is earlier than Start date.");
        } else {
            callback();
        }
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        const leaveTypeOptions = this.props.leaveCategories.map((type)=>{
            return (
                <Option key={type.id} value={type.id}>{type.name}</Option>
            );
        });
        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Form.Item label="Id">
                                {
                                    getFieldDecorator('id', {
                                        rules: [],
                                        initialValue: 0
                                    })(
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min={0}
                                            disabled={true}
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={20}>
                            <Form.Item label="Leave Type :">
                                {getFieldDecorator('categoryId', {
                                    rules: [{ required: true, message: 'Required!' }]
                                })(
                                    <Select placeholder="Select Type">
                                        {
                                            leaveTypeOptions
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Start Date :">
                                {getFieldDecorator('startDate', {
                                    rules: [{ required: true, message: 'Required!' }
                                    ]
                                })(
                                    <DatePicker placeholder="Select start date" style={{ width: '100%' }} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="End Date :">
                                {getFieldDecorator('endDate', {
                                    rules: [{ required: true, message: 'Required!' },
                                        {validator: this.validateEndDate}
                                    ]
                                })(
                                    <DatePicker placeholder="Select end date" style={{ width: '100%' }} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Reason :">
                                {getFieldDecorator('reason', {
                                    rules: [{ required: true, message: 'Required!' }                                   
                                    ]
                                })(
                                    <TextArea placeholder="Reason for the leave" style={{ width: '100%' }} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="modalPopupFooter">
                        <Form.Item style={{ marginRight: 15 }}>
                            <Button onClick={this.props.onCancel}>
                                Close
                            </Button>
                        </Form.Item>
                        <Form.Item style={{ marginLeft: 15 }}>
                            <Button disabled={!this.props.form.isFieldsTouched() || this.props.readonly}
                                type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create({name:'LeaveApplicationForm'})(LeaveApplicationForm);