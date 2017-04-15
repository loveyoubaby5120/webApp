import * as React from 'react';
import { Link } from 'common/Link';
import * as Radium from 'radium';
import { Base as LayoutBase } from 'saas/common/layout/Base';
import { withAppState, WithAppState } from 'saas/common/AppStateStore';
import { BaseStyles } from 'saas/common/BaseStyles';

@Radium
export class UserInfo extends React.Component<WithAppState, void> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div style={[
        BaseStyles.content,
        {
          overflow: 'hidden',
        },
      ]}>
        <div style={[BaseStyles.title]}>
          个人信息
        </div>
        <div className='col-sm-6'>
          <div style={[
            BaseStyles.option,
            BaseStyles.option.bb,
          ]}>
            <label htmlFor='regional' style={[BaseStyles.option.label2]}>
              姓名
              </label>
            <div style={[
              BaseStyles.option.input,
            ]}>
              {
                this.props.data.appState.currentUser.name ?
                  this.props.data.appState.currentUser.name
                  : '无'
              }
            </div>
          </div>
          <div style={[
            BaseStyles.option,
            BaseStyles.option.bb,
          ]}>
            <label htmlFor='professional' style={[BaseStyles.option.label2]}>
              性别
              </label>
            <div style={[
              BaseStyles.option.input,

            ]}>
              {
                this.props.data.appState.currentUser.gender ?
                  this.props.data.appState.currentUser.gender
                  : '无'
              }
            </div>
          </div>
          <div style={[
            BaseStyles.option,
            BaseStyles.option.bb,
          ]}>
            <label htmlFor='total_score' style={[BaseStyles.option.label2]}>
              头像
              </label>
            <div style={[
              BaseStyles.option.input,

            ]}>
              无
            </div>
          </div>
        </div>
        <div className='col-sm-6'>
          <div style={[
            BaseStyles.option,
            BaseStyles.option.bb,
          ]}>
            <label htmlFor='regional' style={[BaseStyles.option.label2]}>
              入学年份
              </label>
            <div style={[
              BaseStyles.option.input,

            ]}>
              {
                this.props.data.appState.currentUser.entryyear ?
                  this.props.data.appState.currentUser.entryyear
                  : '无'
              }
            </div>
          </div>
          <div style={[
            BaseStyles.option,
            BaseStyles.option.bb,
          ]}>
            <label htmlFor='professional' style={[BaseStyles.option.label2]}>
              班级
              </label>
            <div style={[
              BaseStyles.option.input,

            ]}>
              {
                this.props.data.appState.currentUser.class ?
                  this.props.data.appState.currentUser.class
                  : '无'
              }
            </div>
          </div>
          <div style={[
            BaseStyles.option,
            BaseStyles.option.bb,
          ]}>
            <label htmlFor='total_score' style={[BaseStyles.option.label2]}>
              学号
              </label>
            <div style={[
              BaseStyles.option.input,

            ]}>
              {
                this.props.data.appState.currentUser.stu_id ?
                  this.props.data.appState.currentUser.stu_id
                  : '无'
              }
            </div>
          </div>
        </div>
        <div className='col-sm-12'>
          <Link
            className='btn btn-success'
            to={`/resetPassword`}
            style={[
              {
                width: '100px',
              },
              BaseStyles.opStyle,
            ]}>修改密码</Link>
        </div>

      </div>
    );
  }
}

export const DecoratedUserInfo = withAppState(UserInfo);

@Radium
export class UserCenter extends React.Component<void, void> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LayoutBase>
        <DecoratedUserInfo />
      </LayoutBase>
    );
  }
}
