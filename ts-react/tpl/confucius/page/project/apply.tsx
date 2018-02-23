import { Button } from 'common/antd/button';
import { Card } from 'common/antd/card';
import { Col } from 'common/antd/col';
import { Form } from 'common/antd/form';
import { Icon } from 'common/antd/icon';
import { Input } from 'common/antd/input';
import { Row } from 'common/antd/row';
import { Upload } from 'common/antd/upload';
import { Link } from 'common/Link';
import { BaseStyles } from 'confucius/baseStyles';
import { WithAppState, withAppState } from 'confucius/common/appStateStore';
import { staticURL } from 'confucius/publicData';
import { observer } from 'mobx-react';
import * as Radium from 'radium';
import * as React from 'react';
import { withRouter } from 'react-router';
const Style = Radium.Style;

interface Props {
    router?: any;
    params?: any;
    location?: any;
    form: any;
}

@Radium
@observer
export class ApplyView extends React.Component<Props & WithAppState, {}> {

    data: any;

    constructor(props) {
        super(props);
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 0 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };

        const formItemRowLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 0 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 22 },
            },
        };

        const materialsFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        const { getFieldDecorator } = this.props.form;

        return (
            <div style={{ padding: '10px 30px 30px' }}>
                <Style rules={{
                    '.ant-form-item-label': {
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        lineHeight: '20px',
                        paddingTop: '5px',
                    },
                }} />
                <div style={{ position: 'relative' }}>
                    <h3>
                        2018清华大学国际学生（本科）项目申请表
                    </h3>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Row style={{ marginTop: '40px' }}>
                        <Col span={8}>
                            基础资料
                        </Col>
                        <Col span={16}>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('name', {
                                        // rules: [{ required: true, message: '请输入名称' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='名称' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('stu_id', {
                                        // rules: [{ required: true, message: '请输入学号' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='学号' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('grade', {
                                        // rules: [{ required: true, message: '请输入年级' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='年级（例如：2017级）' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('institutions', {
                                        // rules: [{ required: true, message: '请输入院校' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='院校' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('email', {
                                        // rules: [{ required: true, message: '请输入邮箱' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='邮箱' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('phone', {
                                        // rules: [{ required: true, message: '请输入联系电话' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='联系电话' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('visit_major', {
                                        // rules: [{ required: true, message: '请输入访问专业' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='访问专业' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('visit_institutions', {
                                        // rules: [{ required: true, message: '请输入访问院校' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='访问院校' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('institutions', {
                                        // rules: [{ required: true, message: '请输入GPA' }],
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='GPA（4分制）' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('institutions', {
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='年级排名' />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    {...formItemRowLayout}
                                    colon={false}
                                    hasFeedback={true}
                                >
                                    {getFieldDecorator('institutions', {
                                        initialValue: undefined,
                                    })(
                                        <Input.TextArea placeholder='英语水平考试（CET/托福/雅思,总分、小分）' />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '40px' }}>
                        <Col span={8}>
                            <p>支撑材料</p>
                            <p style={{ color: '#999999', fontSize: '12px' }}>支撑材料建议命名方式：姓名_档案类型（如张三_个人陈述（中文）.pdf）</p>
                        </Col>
                        <Col span={16}>
                            <Col span={24}>
                                <Form.Item
                                    {...materialsFormItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                    label='HSK成绩单'
                                    help='Acceptable file types are: DOC, PDF, JPG, JPEG, GIF and PNG. Max 5 MB each.'
                                >
                                    {getFieldDecorator('upload', {
                                        // rules: [{ required: true, message: '请上传HSK成绩单' }],
                                    })(
                                        <Upload>
                                            <Button >
                                                <Icon type='upload' /> Upload
                                            </Button>
                                        </Upload>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    {...materialsFormItemLayout}
                                    colon={false}
                                    hasFeedback={true}
                                    label='免除提供HSK成绩的相关证明'
                                    help='Acceptable file types are: DOC, PDF, JPG, JPEG, GIF and PNG. Max 5 MB each.'
                                >
                                    {getFieldDecorator('upload', {
                                        // rules: [{ required: true, message: '请上传免除提供HSK成绩的相关证明' }],
                                    })(
                                        <Upload>
                                            <Button >
                                                <Icon type='upload' /> Upload
                                            </Button>
                                        </Upload>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={24} style={{ marginTop: '30px' }}>
                                <Form.Item
                                    wrapperCol={{
                                        xs: { span: 24, offset: 0 },
                                        sm: { span: 24, offset: 0 },
                                    }}>
                                    <Button type='primary' htmlType='submit'>确定</Button>
                                    <Button
                                        style={{ margin: '0 0 0 10px' }}
                                        onClick={() => {
                                            this.props.router.push({
                                                pathname: `/project/info/${this.props.params.id}`,
                                                query: this.props.location.query,
                                            });
                                        }}>取消</Button>
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
                </Form>
                <div style={{ margin: '20px 0 0' }}>
                    <span style={{ color: 'red' }}>*</span>此页面仅作为演示使用
                </div>
            </div>
        );
    }

    private handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.router.push({
                    pathname: `/project/success/${this.props.params.id}`,
                    query: this.props.location.query,
                });
            }
        });
    }
}

export const Apply = withRouter(Form.create()(withAppState(ApplyView)));
