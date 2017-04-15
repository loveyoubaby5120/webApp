import * as React from 'react';
import { withRouter } from 'react-router';
import { Base as LayoutBase } from 'saas/common/layout/Base';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import * as Radium from 'radium';
import { minghuNav } from '../../PublicData';
let Style = Radium.Style;

@Radium
export class HomeView extends React.Component<{ router: any; } & WithAppState, void> {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <LayoutBase>
        <Style rules={{
          '.thumbnail': {
            cursor: 'pointer',
          },
          '.thumbnail:hover': {
            backgroundColor: '#F9F9FB',
          },
        }} />
        <div className='row'
          style={[
          ]}>
          {
            minghuNav.map((r, i) => {
              return (
                <div key={i} className='col-sm-12'>
                  <p className='col-sm-12'
                    style={[
                      {
                        margin: '40px 0 15px',
                        fontSize: '18px',
                        color: '#000',
                      },
                    ]}>
                    {r.navTitle}
                  </p>
                  {
                    r.childer.map((item, index) => {
                      return (
                        <div key={index} className='col-sm-6'>
                          <div className='thumbnail'
                            onClick={(ev) => {
                              ev.preventDefault();
                              if (item['openWindow']) {
                                window.open(item.link);
                              } else {
                                window.location.href = item.link;
                              }
                            }}
                            style={[
                              {
                                overflow: 'hidden',
                                height: '120px',
                                padding: '20px 15px',
                              },
                            ]}>
                            <img src=''
                              style={[
                                {
                                  float: 'left',
                                  width: '30px',
                                  margin: '10px',
                                },
                              ]} />
                            <div className='caption'
                              style={[
                                {
                                  marginLeft: '50px',
                                },
                              ]}>
                              <h3 style={[
                                {
                                  color: '#0099ff',
                                  fontSize: '18px',
                                  margin: '0 0 10px',
                                },
                              ]}>
                                {item.name}
                              </h3>
                              <p style={[
                                {
                                  color: '#666666',
                                  fontSize: '14px',
                                  marginTop: '15px',
                                },
                              ]}>
                                {item.describe}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </LayoutBase>
    );
  }
}

export const Home = withRouter(withAppState(HomeView));
