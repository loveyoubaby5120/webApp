import * as React from 'react';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { Choice } from 'saas/common/PublicData';

@Radium
export class BatchSaveView extends React.Component<WithAppState & void, void> {
  constructor(props) {
    super(props);
  }

  onBatchSave = (ev) => {
    let query = this.props.data.surveyState.batch.query;
    let refId = 'textarea' + query.mark_id;
    let val = this.refs[refId]['value'];
    if (val && this.props.data.surveyState.batch.kind) {
      let array = val.split('\n');
      array.forEach((r, i) => {
        if (this.props.data.surveyState.batch.kind === 'sub') {
          query.sub_title.push(r);
        } else {
          query.choice.push(new Choice({
            content: r,
            can_edit: this.props.data.surveyState.batch.edit,
          }));
          console.log(query.choice)
        }
      });
    }
    this.refs[refId]['value'] = '';
    if (typeof (this.props.data.surveyState.batch.callback) === 'function') {
      this.props.data.surveyState.batch.callback(query);
    }
  }

  onBatchBox = (ev) => {
    this.refs['textarea' + this.props.data.surveyState.batch.query.mark_id]['value'] = '';
    this.props.data.surveyState.batch.save = !this.props.data.surveyState.batch.save;
    this.props.data.surveyState.batch.edit = false;
    this.props.data.surveyState.batch.kind = '';
    this.props.data.surveyState.batch.callback = this.onBatchSave;
  }

  render() {
    return (
      <div style={[
        {
          position: 'fixed',
          right: '30%',
          top: '25%',
          width: '40%',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '20px',
          backgroundColor: '#fff',
          textAlign: 'right',
          zIndex: '99',
        },
        this.props.data.surveyState.showEdit !== -1 && this.props.data.surveyState.batch.save ?
          { display: 'block' } : { display: 'none' },
      ]}>
        <h4 style={[
          {
            margin: '10px 0 10px',
            textAlign: 'left',
          },
        ]}>
          批量添加
          </h4>
        <textarea className='form-control'
          style={[
            {
              margin: '0 0 20px',
            },
          ]}
          ref={'textarea' + this.props.data.surveyState.batch.query.mark_id}
          rows={8}
          placeholder={'输入选项'}>
        </textarea>
        <button type='button'
          className='btn btn-info'
          onClick={this.onBatchSave}
          style={[
            {
              marginRight: '10px',
            },
          ]}>
          添加
          </button>
        <button type='button'
          onClick={this.onBatchBox}
          className='btn btn-default'>
          取消
          </button>
      </div>
    );
  }
};

export const BatchSave = withAppState(BatchSaveView);
