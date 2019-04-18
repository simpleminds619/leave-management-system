import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, InputNumber, Select, DatePicker, Button } from 'antd';
import './HolidayForm.css';
import _ from 'lodash';
import moment from 'moment';
const { Option } = Select;

class HolidayForm extends PureComponent {
    componentDidMount() {
        let { formData } = this.props;
        if (formData) {
            this.props.form.setFieldsValue({
                year: formData.year,
                reason: formData.reason,
                location: formData.location.id,
                effectiveDate: moment(formData.effectiveDate),
                status: formData.status,
                id: formData.id
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.effectiveDate = values.effectiveDate.format('YYYY-MM-DD');
                values.location = {
                    id: values.location,
                    name: this.props.locationList.filter((value) => value.id === values.location)[0].name
                }
                this.props.onSubmit(values);
            }
        });
    }

    validateHolidayDate = (rule, value, callback) => {
        const form = this.props.form;
        if (value && parseInt(value.format('YYYY')) !== form.getFieldValue('year')) {
            callback("Holiday date year should match 'Year' field.");
        } else {
            callback();
        }
    }

    validateYear = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== parseInt(form.getFieldValue('effectiveDate').format('YYYY'))) {
            callback("Should be same year as 'Date' field.");
        } else {
            callback();
        }
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        let locationOptions = _.map(this.props.locationList, (value) => (
            <Option key={value.id} value={value.id}>{value.name}</Option>
        ));
        let currentYear = (new Date()).getFullYear();
        return (
            <div>
                <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
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
                                    rules: [{ required: true, message: 'Required!' },
                                    { validator: this.validateYear }
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
                                    rules: [{ required: true, message: 'Required!' },
                                    { validator: this.validateHolidayDate }
                                    ]
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
                        <Form.Item style={{ marginRight: 15 }}>
                            <Button onClick={this.props.onCancel}>
                                Close
                            </Button>
                        </Form.Item>
                        <Form.Item style={{ marginLeft: 15 }}>
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