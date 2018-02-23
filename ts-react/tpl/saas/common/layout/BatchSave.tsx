import { Modal } from 'common/antd/modal';
import { observer } from 'mobx-react';
import * as Radium from 'radium';
import * as React from 'react';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { Choice } from 'saas/common/PublicData';

@Radium
@observer
export class BatchSaveView extends React.Component<WithAppState, {}> {
    constructor(props) {
        super(props);
    }

    onBatchSave = (ev) => {
        let query = this.props.data.surveyState.batch.query;
        let refId = 'textarea' + query.mark_id;
        let val = this.refs[refId]['value'];
        if (val && this.props.data.surveyState.batch.kind) {
            const array = val.split('\n');
            array.forEach((r, i) => {
                if (this.props.data.surveyState.batch.kind === 'sub') {
                    query.sub_title.push(r);
                } else {
                    query.choice.push(new Choice({
                        content: r,
                        can_edit: this.props.data.surveyState.batch.edit,
                    }));
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
            <div>
                <Modal
                    title={<div style={{ color: '#666', fontWeight: 'normal' }}>批量添加</div>}
                    visible={this.props.data.surveyState.showEdit !== -1 && this.props.data.surveyState.batch.save}
                    onCancel={this.onBatchBox}
                    onOk={this.onBatchSave}>
                    <textarea className='form-control'
                        style={[
                            {
                                margin: '0 0 20px',
                            },
                        ]}
                        ref={'textarea' + this.props.data.surveyState.batch.query.mark_id}
                        rows={8}
                        placeholder={'每行一个选项，可增加多个选项'}>
                    </textarea>
                </Modal>
            </div>
        );
    }
}

export const BatchSave = withAppState(BatchSaveView);
