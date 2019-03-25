import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Select, InputNumber, Button } from 'antd';
import './LeaveCategoryForm.css';
const { Option } = Select;


class LeaveCategoryForm extends PureComponent {
    componentDidMount(){
        this.props.form.setFieldsValue(this.props.formData);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onSubmit(values);
            }
        });
    }

    validateTotalCarryFwdLeaves = (rule, value, callback) =>{
        const form = this.props.form;
        if (value && value > form.getFieldValue('totalLeaves')) {
            callback('Value should not exceed Total Leaves field!');
          } else {
            callback();
          }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Form.Item label="Id">
                                {
                                    getFieldDecorator('id',{
                                        rules:[],
                                        initialValue:0
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
                        <Col span={10}>
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Required!' },
                                            {whitespace:true, message:'Required!'}    
                                    ]
                                })(
                                    <Input disabled={this.props.readonly} placeholder="Leave Category Name" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Code">
                            {
                                getFieldDecorator('code',{
                                    rules:[{required:true, message:'Required!'},
                                        {min:2, message:'Category Code should be between 2 to 3 characters long!'},
                                        {max:3, message:'Category Code should be between 2 to 3 characters long!'},
                                        {whitespace:true, message:'Required!'}                                        
                                    ]
                                })(<Input placeholder="Leave Category Code" disabled={this.props.readonly} />)
                            }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Total Leaves">
                            {
                                getFieldDecorator('totalLeaves',{
                                    rules:[{required:true, message:'Required!'},
                                        {max:40, message:'Total Leaves is more than 40!', type:'number'}                      
                                    ]
                                })(<InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Total leaves for the category"
                                    min={0}
                                    disabled={this.props.readonly}
                                />)
                            }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Total Carry Forward Leaves">
                                {
                                    getFieldDecorator('totalCarryFwdLeaves',{
                                        rules:[
                                            {required:true, message:'Required!'},
                                            {validator:this.validateTotalCarryFwdLeaves} 
                                        ]
                                    })(
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        placeholder="Total no.of carry forward leaves"
                                        min={0}
                                        disabled={this.props.readonly}
                                    />)
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Carry Forward Leaves Limit">
                            {
                                getFieldDecorator('upperLimitOfLeaves',{
                                    rules:[
                                        {required:true, message:'Required!'},
                                        {max:40, message:'Total Carry Forward Leaves is more than 40!', type:'number'}
                                    ]
                                })(
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Upper limit for carry forwaded leaves"
                                    min={0}
                                    disabled={this.props.readonly}
                                />)
                            }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Status">
                                {
                                    getFieldDecorator('status',{
                                        rules:[
                                            {required:true, message:"Requried!"}
                                        ]
                                    })(
                                    <Select disabled={this.props.readonly}>
                                        <Option value="InActive">InActive</Option>
                                        <Option value="Active">Active</Option>
                                    </Select>)
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Form.Item>
                                <Button onClick={this.props.onCancel}>
                                    Close
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <Button disabled={!this.props.form.isFieldsTouched() || this.props.readonly} 
                                    type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'leaveCategoryForm'})(LeaveCategoryForm);