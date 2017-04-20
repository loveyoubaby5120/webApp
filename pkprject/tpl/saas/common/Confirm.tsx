import * as React from 'react';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { BaseStyles } from 'saas/common/BaseStyles';

let styles = {
  divStyle: {
    width: '98%',
  },
  opSpanStyle: {
    color: '#999999',
    marginRight: '3px',
    position: 'absolute',
    right: '5px',
    top: '10px',
    cursor: 'pointer',
  },
};

// @Radium
export class ConfirmView extends React.Component<WithAppState & void, void> {
  constructor(props) {
    super(props);
  }

  onOk = (ev) => {
    if (typeof (this.props.data.confirm.ok) == 'function') {
      this.props.data.confirm.ok();
    } else {
      this.props.data.closeConfirm();
    }
  }

  render() {
    return (
      <div style={[
        BaseStyles.confirm,
        this.props.data.confirm.show ? { display: 'block' } : { display: 'none' },
      ]}>
        <div style={[BaseStyles.content, BaseStyles.confirm.box]}>
          {
            this.props.data.confirm.ok || this.props.data.confirm.cancel ?
              (
                <span style={[styles.opSpanStyle]}
                  className='icon fa fa-times'
                  onClick={this.props.data.closeConfirm}>
                </span>
              )
              :
              ''
          }
          <b style={[BaseStyles.confirm.title]}>{this.props.data.confirm.title}</b>
          <div style={[
            {
              margin: '20px 0px',
              overflow: 'auto',
            },
          ]}>
            <div className=''
              style={[
                {
                  maxHeight: '140px',
                },
              ]}>
              {this.props.data.confirm.describe}
            </div>
          </div>
          <div style={[{ textAlign: 'right' }]}>
            {
              this.props.data.confirm.ok ?
                (
                  <button style={[BaseStyles.confirm.opStyle]}
                    className='btn btn-success'
                    onClick={this.onOk}>
                    确定
                </button>
                )
                :
                ''
            }

            {
              this.props.data.confirm.cancel ?
                (
                  <button style={[BaseStyles.confirm.opStyle]}
                    className='btn btn-default'
                    onClick={this.props.data.closeConfirm}>
                    关闭
                </button>
                )
                :
                ''
            }


          </div>
        </div>
      </div>
    );
  }
};

export const Confirm = withAppState(ConfirmView);
