import { Breadcrumb } from 'common/antd/breadcrumb';
import { Col } from 'common/antd/col';
import { Icon } from 'common/antd/icon';
import { Menu } from 'common/antd/menu';
import { Row } from 'common/antd/row';
import { Link } from 'common/Link';
import { S } from 'common/locale_to_b';
import { WithAppState, withAppState } from 'confucius/common/appStateStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as Radium from 'radium';
import * as React from 'react';
import { withRouter } from 'react-router';
import { Nav } from 'saas/common/NavData';

interface Props {
    router?: any;
    location?: any;
    nav: Nav;
    showNav?: boolean;
}

@Radium
@observer
export class MenuBaseView extends React.Component<Props & WithAppState, {}> {
    pathname = this.props.location.pathname;

    @observable private selectedText: string[] = [];

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setSelect();
    }

    componentDidUpdate() {
        if (this.props.location.pathname === this.pathname) {
            return;
        }
        this.setSelect();
    }

    setSelect() {
        this.selectedText = [];
        this.search(this.props.nav ? this.props.nav.childer || [] : []);
        this.pathname = this.props.location.pathname;
    }

    search(item) {
        let isEdit = true;

        item.forEach((r, index) => {
            if (!isEdit) {
                return;
            }

            if (this.props.location.pathname.indexOf(r.link) !== -1) {
                this.selectedText.push(r.describe ? r.describe : r.title);
                isEdit = false;

                if (r.childer && r.childer.length > 0) {
                    this.search(r.childer);
                }
                return;
            }
        });
    }

    render() {
        return (
            <Row style={{ padding: ' 10px 0 50px', height: '100%' }} gutter={10} >
                <Col span={24}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item style={this.selectedText && this.selectedText.length > 0 ? {} : { display: 'none' }}><Link to={this.props.nav.link}>{this.props.nav.title}</Link></Breadcrumb.Item>
                        {
                            this.selectedText.map((r, i) => {
                                return (<Breadcrumb.Item key={i}>{r}</Breadcrumb.Item>);
                            })
                        }
                    </Breadcrumb>
                </Col>
                <Col style={{ height: '100%' }} span={24}>
                    <div style={{
                        backgroundColor: '#fff',
                        border: '1px solid #e9e9e9',
                        padding: '20px',
                        height: '100%',
                        overflow: 'auto',
                    }}>
                        <div id='course-arrangement-content' style={{ position: 'relative' }}>
                            {this.props.children}
                        </div>
                    </div>
                </Col>
            </Row >
        );
    }
}

export const MenuBase = withRouter(withAppState(MenuBaseView));
