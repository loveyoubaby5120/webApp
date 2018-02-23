import { Button } from 'common/antd/button';
import { Card } from 'common/antd/card';
import { Col } from 'common/antd/col';
import { Icon } from 'common/antd/icon';
import { Row } from 'common/antd/row';
import { Table } from 'common/antd/table';
import { Tag } from 'common/antd/tag';
import { Tooltip } from 'common/antd/tooltip';
import { pendingMessage, Querier } from 'common/graphql';
import { LanguageCode } from 'common/languageCode';
import { Link } from 'common/Link';
import { S as ProvinceS } from 'common/locale_province';
import { S as RankS } from 'common/locale_rank';
import { S } from 'common/locale_to_b';
import { BaseStyles } from 'confucius/baseStyles';
import { WithAppState, withAppState } from 'confucius/common/appStateStore';
import { Province, Rank, staticURL } from 'confucius/publicData';
import * as _ from 'lodash';
import { autorun, observable, reaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { get as getPath } from 'object-path';
import * as Radium from 'radium';
import * as React from 'react';
import { withRouter } from 'react-router';
import { staticInstituteURL } from 'saas/common/PublicData';
const Style = Radium.Style;

const query = `
query(
    $ranking_key: String,
    $province: String,
    $size: Int!,
    $offset: Int,
) {
    confucius {
        listInstitutes(
            ranking_key: $ranking_key,
            province: $province,
            size: $size,
            offset: $offset,
        ){
            items {
                name {
                    cn
                    en
                }
                can_apply
                slug
                province
            }
            page_info {
                count
                offset
            }
        }
    }
}`;

interface Props {
    router?: any;
    params?: any;
    location?: { query: { kind: string } };
}

@Radium
@observer
export class ListView extends React.Component<Props & WithAppState, {}> {
    query: Querier<any, any> = new Querier(null);
    disposers: Array<() => void> = [];

    columns: any;

    @observable private checked: string[] = ['All'];
    @observable private rank: string[] = [];

    @observable private size: number = 10;
    @observable private page: number = 1;
    @observable private resultData?: any;
    @observable private loading: boolean = false;

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.disposers.forEach(f => f());
        this.disposers = [];
    }

    componentWillMount() {
        this.columns = [
            {
                title: 'logo',
                dataIndex: 'province',
                width: '15%',
                render: (value, record, index) => {
                    return (
                        <div>
                            <img alt='example' style={{ width: '80px' }} src={staticInstituteURL(`${record.slug}`)} />
                        </div>
                    );
                },
            }, {
                title: '名称',
                dataIndex: `name`,
                width: '85%',
                render: (value, record, index) => {
                    return (
                        <div style={{ position: 'relative' }}>
                            <h4 style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => {
                                window.open(`/institute-${LanguageCode}/${record.slug}/`);
                            }}>{value[LanguageCode]}</h4>
                            <p>{LanguageCode === 'cn' ? record.province : _.find(Province, { value: record.province }).key}</p>
                            <Button type='primary'
                                disabled={!record.can_apply}
                                onClick={() => {
                                    this.props.router.push({
                                        pathname: `/project/info/${record.slug}`,
                                        query: {
                                            title: value[LanguageCode],
                                        },
                                    });
                                }}
                                style={{
                                    position: 'absolute',
                                    right: '0',
                                    top: '0',
                                }}>{S['Apply Online']}</Button>
                        </div>
                    );
                },
            },
        ];
    }

    componentDidMount() {
        this.getData();
        // if (
        //     (this.props.location.query.kind && this.props.location.query.kind === 'order') ||
        //     !this.props.location.query.kind
        // ) {
        //     this.rank = ['cn_china15'];
        // }
    }

    getData() {
        this.disposers.push(autorun(() => {
            this.query.setReq({
                query,
                variables: {
                    ranking_key: this.rank.length > 0 ? this.rank[0] : undefined,
                    province: this.checked.length > 0 && this.checked.indexOf('All') === -1 ? this.checked[0] : undefined,
                    offset: (this.page - 1) * this.size,
                    size: this.size,
                },
            });
        }));

        this.disposers.push(autorun(() => {
            this.loading = this.query.refreshing;
        }));

        this.disposers.push(reaction(() => {
            return (getPath(this.query.result, 'result.data.confucius.listInstitutes') as any) || {};
        }, searchData => {
            this.resultData = searchData;
        }));
    }

    render() {
        const pending = pendingMessage(this.query.result);
        if (pending) {
            return (<div></div>);
        }

        let dataSource = getPath(toJS(this.resultData), 'items') as any[] || [];

        dataSource = dataSource.map((r, i) => {
            r['key'] = i;
            return r;
        });

        return (
            <div style={{ padding: '10px 30px 30px' }}>
                <Style rules={{
                    '.ant-tag-checkable-style': {
                        border: '1px solid #e4e4e4',
                        backgroundColor: '#fafafa',
                    },
                    '.ant-tag': {
                        marginBottom: '8px',
                    },
                }} />
                <div>
                    <h3>
                        {S['University Project']}
                    </h3>
                    <Row style={
                        Object.assign({ marginTop: '35px' },
                            !this.props.location.query.kind ||
                                (this.props.location.query.kind && this.props.location.query.kind === 'province')
                                ? {} : { display: 'none' },
                        )
                    }>
                        <Col span={3}>
                            {S['Region']}
                        </Col>
                        <Col span={21}>
                            <Tag.CheckableTag
                                className={this.checked.indexOf('All') > -1 ? '' : 'ant-tag-checkable-style'}
                                checked={this.checked.indexOf('All') > -1}
                                onChange={(checked) => {
                                    this.handleChange('All', checked);
                                }}>
                                {S['All']}
                            </Tag.CheckableTag>
                            {
                                Province.map((r, i) => {
                                    return (
                                        <Tag.CheckableTag key={i}
                                            className={this.checked.indexOf(r.value) > -1 ? '' : 'ant-tag-checkable-style'}
                                            checked={this.checked.indexOf(r.value) > -1}
                                            onChange={(checked) => {
                                                this.handleChange(r.value, checked);
                                            }}>
                                            {ProvinceS[r.key]}
                                        </Tag.CheckableTag>
                                    );
                                })
                            }
                        </Col>
                    </Row>
                    <Row style={
                        Object.assign({ marginTop: '25px' },
                            !this.props.location.query.kind ||
                                (this.props.location.query.kind && this.props.location.query.kind === 'order')
                                ? {} : { display: 'none' },
                        )
                    }>
                        <Col span={3}>
                            {S['Ranking']}
                        </Col>
                        <Col span={21}>
                            {
                                Rank.map((r, i) => {
                                    return (
                                        <Tag.CheckableTag key={i}
                                            className={this.rank.indexOf(r.key) > -1 ? '' : 'ant-tag-checkable-style'}
                                            checked={this.rank.indexOf(r.key) > -1}
                                            onChange={(checked) => {
                                                this.rankHandleChange(r.key, checked);
                                            }}>
                                            {RankS[r.key]}
                                        </Tag.CheckableTag>
                                    );
                                })
                            }
                        </Col>
                    </Row>
                    <Table dataSource={dataSource}
                        style={{
                            marginTop: '20px',
                        }}
                        loading={this.loading}
                        pagination={{
                            total: this.resultData.page_info.count,
                            current: this.page,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            defaultPageSize: this.size,
                        }}
                        title={() => {
                            return `${this.resultData.page_info.count}${S['results']}`;
                        }}
                        showHeader={false}
                        onChange={this.onChange}
                        columns={this.columns} />
                </div>
            </div>
        );
    }

    private onChange = (pagination, filters, sorter) => {
        this.size = pagination.pageSize;
        this.page = pagination.current;
    }

    private handleChange = (title, checked) => {
        const index = this.checked.indexOf(title);
        if (index > -1) {
            this.checked.splice(index, 1);
            return;
        }
        this.checked = [title];
    }

    private rankHandleChange = (title, checked) => {
        const index = this.rank.indexOf(title);
        if (index > -1) {
            this.rank.splice(index, 1);
            return;
        }
        this.rank = [title];
    }

}

export const List = withRouter(withAppState(ListView));
