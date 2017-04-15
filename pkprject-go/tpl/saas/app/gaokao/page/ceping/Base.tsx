import * as React from 'react';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { dataToJson } from '../../PublicData';
import { Querier, pendingMessage } from 'common/graphql';
import { get as getPath } from 'object-path';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';

interface Props {
  params?: { parmname: string };
}

const query = `
query{
  gaokao {
    listCepingProfile(offset: 0, size: 1) {
      items {
        basic {
          _id
          kind
          user_info {
            division
          }
        }
        gaokao {
          bonus{
            key
            score
          }
          score {
            kind
            score
          }
          preference
          independent_recruitment {
            institute_slug
            institute {
              name
              native_name
              wikipedia {
                localized_name {
                  cn
                }
              }
            }
            score
          }
        }
        interest {
          field_of_study_keys
          field_of_study_category_keys
          institute_locations
        }
      }
    }
  }
}`;

@observer
@Radium
export class BaseView extends React.Component<Props & WithAppState, void> {
  query: Querier<any, any>;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.data.showConfirm(
      '注意',
      '本系统提供的结果仅用于进行高考志愿填报的参考信息，请综合各种信息进行报考',
      false,
      true,
    );
    this.getData();
  }

  getData() {
    this.query = new Querier({
      query: query,
    });

    autorun(() => {
      if (this.query.result.status === 'ok') {
        const searchData = (getPath(this.query.result, 'result.data') as any) || [];
        if (searchData.gaokao.listCepingProfile.items.length > 0) {
          let data = dataToJson(searchData.gaokao.listCepingProfile.items[0]);
          this.props.data.gaoKaoState.userInfo = data;
        }
      }
    });
  }

  render() {
    const pending = pendingMessage(this.query.result);
    if (pending) {
      return (<div>{pending}</div>);
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

export const Base = withAppState(BaseView);
