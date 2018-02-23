import { Button } from 'common/antd/button';
import { Col } from 'common/antd/col';
import { Icon } from 'common/antd/icon';
import { Row } from 'common/antd/row';
import { Link } from 'common/Link';
import { S } from 'common/locale_to_b';
import { BaseStyles } from 'confucius/baseStyles';
import { WithAppState, withAppState } from 'confucius/common/appStateStore';
import { staticURL } from 'confucius/publicData';
import { observer } from 'mobx-react';
import * as Radium from 'radium';
import * as React from 'react';
import { withRouter } from 'react-router';
const Style = Radium.Style;

interface Props {
    params?: any;
    location?: any;
    router?: any;
}

@Radium
@observer
export class SuccessView extends React.Component<Props & WithAppState, {}> {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='text-center' style={{ padding: '30px 30px' }}>
                <h3>{S['You have submitted your application successfully.']}</h3>
                <p style={{ margin: '20px 0 30px' }}>{S['We are processing the application information submitted by you. Please wait until we contact you.']}</p>
                <Button onClick={() => {

                    this.props.router.push({
                        pathname: `/project/info/${this.props.params.id}`,
                        query: this.props.location.query,
                    });
                }}>{S['Back']}</Button>
            </div>
        );
    }
}

export const Success = withRouter(withAppState(SuccessView));
