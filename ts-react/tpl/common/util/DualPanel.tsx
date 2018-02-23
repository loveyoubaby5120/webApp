import * as React from 'react';

interface DualPanelProps {
  fetch : (cls : DualPanel, nocache : boolean) => void;
  renderElement : (data : any) => JSX.Element;
  content : React.ComponentClass<{refreshFunc : () => void, data : any}>;
}

interface DualPanelState {
  listData? : any[];
  errorText? : string;
  selected? : any;
  mouseEntered? : any;
}

export class DualPanel extends React.Component<DualPanelProps, DualPanelState> {
  constructor() {
    super();
    this.state = {
      selected: null,
      mouseEntered: null,
      listData: null,
      errorText: '',
    };
  }

  componentDidMount() {
    this.props.fetch(this, false);
  }

  list = () => {
    if (!this.state.listData) {
      return this.state.errorText? <p style={{color: 'red'}}>{this.state.errorText}</p> : <p>loading...</p>;
    }
    return <div>{this.state.listData.map((ele, i) => {
      return <div className='pure-u list-element' key={i}
          onClick={() => {
            if (this.state.selected === ele) {
              this.setState({
                selected: null,
              });
              return;
            }
            this.setState({
              selected: ele,
            });
          }}
          onMouseEnter={() => {
            this.setState({
              mouseEntered: ele,
            })
          }}
          onMouseLeave={() => {
            this.setState({
              mouseEntered: null,
            })
          }}
          style={{
            padding: '0px 16px 0px 16px',
            borderBottom: '1px solid #ddd',
            width: '100%',
            maxWidth: '100%',
            backgroundColor: this.state.selected === ele ? '#E1F5FE' : (this.state.mouseEntered === ele? '#ECEFF1' : 'white'),
          }}>
          {this.props.renderElement(ele)}
        </div>
    })}</div>
  }


  render() {
    return (
      <div>
        <div className={'pure-u-1'} style={{
          position: 'fixed',
          height: '100%',
          width: '350px',
          top: '0',
          bottom: '0',
          overflow: 'auto',
          borderRight: '1px solid #ddd',
        }}>
          {this.list()}
        </div>
        <div style={{
          marginLeft: '350px',
          padding: '16px',
        }}>
          {React.createElement(this.props.content, {
            refreshFunc: () => {this.props.fetch(this, true);},
            data: this.state.selected,
          })}
        </div>
      </div>
    );
  }
}