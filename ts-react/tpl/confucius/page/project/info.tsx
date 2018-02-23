import { Button } from 'common/antd/button';
import { Card } from 'common/antd/card';
import { Col } from 'common/antd/col';
import { Icon } from 'common/antd/icon';
import { Row } from 'common/antd/row';
import { Tag } from 'common/antd/tag';
import { Link } from 'common/Link';
import { S } from 'common/locale_to_b';
import { BaseStyles } from 'confucius/baseStyles';
import { WithAppState, withAppState } from 'confucius/common/appStateStore';
import { staticURL } from 'confucius/publicData';
import { observer } from 'mobx-react';
import * as Radium from 'radium';
import * as React from 'react';
import { withRouter } from 'react-router';
import { staticInstituteURL } from 'saas/common/PublicData';
const Style = Radium.Style;

interface Props {
    router: any;
    params?: any;
    location?: any;
}

@Radium
@observer
export class InfoView extends React.Component<Props & WithAppState, {}> {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={{ padding: '10px 30px 170px' }}>
                <div style={{ position: 'relative' }}>
                    <h3 style={{ paddingRight: '100px' }}>
                        2018{this.props.location.query.title}国际学生（本科）
                    </h3>
                    <span style={{
                        color: '#666',
                        margin: '5px 0 30px',
                        display: 'inline-block',
                    }}>{this.props.location.query.title}本科招生</span>
                    <Button type='primary'
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => {
                            this.props.router.push({
                                pathname: `/project/apply/${this.props.params.id}`,
                                query: this.props.location.query,
                            });
                        }}>{S['Apply']}</Button>
                </div>
                <div style={BaseStyles.item}>
                    <div style={[BaseStyles.title]}>
                        学校
                    </div>
                    <div style={BaseStyles.content}>
                        <img alt='example'
                            style={Object.assign(BaseStyles.recommendedInstitutes.item.logo.img, { width: '60px', margin: 0 })}
                            src={staticInstituteURL(`${this.props.params.id}`)} />
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '80px',
                        }}>
                            <p style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                lineHeight: '30px',
                                color: '#0099ff',
                            }}>{this.props.location.query.title}</p>
                            <p style={{
                                color: '#666',
                                lineHeight: '30px',
                            }}>北京</p>
                        </div>
                    </div>
                </div>
                <div style={BaseStyles.item}>
                    <div style={[BaseStyles.title]}>
                        截止日期
                    </div>
                    <div style={BaseStyles.content}>
                        2017-12-01
                    </div>
                </div>
                <div style={BaseStyles.item}>
                    <div style={[BaseStyles.title]}>
                        标准考试
                    </div>
                    <div style={BaseStyles.content}>
                        <Row gutter={20}>
                            <Col span={8}>
                                <Tag color='#F69E4A'>HSK</Tag>
                                <span>5</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={BaseStyles.item}>
                    <div style={[BaseStyles.title]}>
                        申请材料
                    </div>
                    <div style={BaseStyles.content}>
                        <Row gutter={20}>
                            <Col span={8}>
                                <Tag color='#F69E4A'>HSK</Tag>
                                <span>5</span>
                            </Col>
                            <Col span={8}>
                                <Tag color='#F69E4A'>Degree</Tag>
                                <span>Bachelor</span>
                            </Col>
                            <Col span={8}>
                                <Tag color='#F69E4A'>Transcript</Tag>
                                <span>Required</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={BaseStyles.item}>
                    <div style={[BaseStyles.title]}>
                        申请资格
                    </div>
                    <div style={BaseStyles.content}>
                        <ul>
                            <li>1. 品行端正，身体健康，具有相当于中国普通高中毕业学历的外国公民。</li>
                            <li>2. 学习成绩优良，请提供如下成绩证明（包括但不限于）：</li>
                            <li>2.1最高学历学校提供的官方成绩单（原件及中文或英文公证件）；</li>
                            <li>2.2国家/地区统一高中毕业考试成绩单；</li>
                            <li>2.3国际通行标准化测试成绩（如SAT/ACT/A-Level/AP/IB等）。</li>
                            <li>3. 截至2018年9月1日年龄在18周岁（含）以上；仍未满18周岁的申请人，须在入学时提交相关证明文件（详见附件二中说明）。</li>
                            <li>4. 汉语水平：</li>
                            <li>4.1汉语水平达到HSK五级（含）以上，且每一科目均在60分以上；</li>
                            <li>4.2汉语水平最低达到HSK四级也可申请，但需在入学后一年内达到HSK五级（含）以上（且每一科目均在60分以上），否则取消就读资格；</li>
                            <li>4.3 如母语为汉语或高中阶段使用汉语教学的申请者，经我校认定，可免除提供HSK成绩。</li>
                            <li>5. 英语水平良好：母语为非英语的申请者需提供TOEFL/IELTS等英语水平成绩证明。</li>
                            <li>6. 对原为中国公民、后加入外国国籍者，我校执行<span style={{ color: '#0099ff' }}>教育部教外来〔2009〕83号文</span>。</li>
                        </ul>
                    </div>
                </div>
                <div style={BaseStyles.item}>
                    <div style={[BaseStyles.title]}>
                        申请流程
                    </div>
                    <div style={BaseStyles.content}>
                        <ul>
                            <li>1.网上申请</li>
                            <li>请在报名开放时间内登录国际学生（本科）申请系统，注册并登录后按要求真实、完整地填写{this.props.location.query.title}本科国际学生项目申请表，并按照系统要求上传相关证明附件（请参考网上申请上传附件列表）。填写完毕后需提交申请材料，并在线支付申请费人民币600元。</li>
                            <li>2.综合测评</li>
                            <li>2.1材料评审</li>
                            <li>对于按时提交申请及相关证明附件的申请人，且申请材料信息真实、完整，我校将组织专家进行材料评审。</li>
                            <li>2.2面试</li>
                            <li>通过材料评审的申请人进入面试环节，面试时间、方式将在后续通知。其中，申请艺术类设计学、美术学相关专业申请人需到{this.props.location.query.title}加试：素描、速写、色彩。</li>
                            <li>对于特别优秀的申请者，经过专家评审，有免面试拟录取的机会。</li>
                            <li>3.录取</li>
                            <li>{this.props.location.query.title}国际学生（本科）的录取是基于对申请者各项成绩和其它资质证明材料、面试成绩等的综合评定。</li>
                        </ul>
                    </div>
                </div>
                <div style={BaseStyles.item}>
                    <div style={[BaseStyles.title]}>
                        日程安排
                    </div>
                    <div style={BaseStyles.content}>
                        <ul>
                            <li>1.第一批次</li>
                            <li>在线申请时间（北京时间）：2017年9月1日08:00～2017年10月12日17：00（艺术类设计学、美术学相关专业仅在此批次开放申请）</li>
                            <li>录取结果公布时间：2017年12月中旬</li>
                            <li>2.第二批次</li>
                            <li>在线申请时间（北京时间）：2017年10月16日08:00～2017年11月30日17：00</li>
                            <li>录取结果公布时间：2018年2月底</li>
                            <li>3.第三批次</li>
                            <li>在线申请时间（北京时间）：2017年12月4日08:00～2018年1月3日17：00</li>
                            <li>录取结果公布时间：2018年3月底</li>
                            <li>&nbsp;</li>
                            <li>备注：以上三个批次面试时间、方式将在后续通知。</li>
                        </ul>
                    </div>
                </div>
                <div style={{ margin: '20px 0 0' }}>
                    <span style={{ color: 'red' }}>*</span>此页面仅作为演示使用
                </div>
            </div>
        );
    }
}

export const Info = withRouter(withAppState(InfoView));
