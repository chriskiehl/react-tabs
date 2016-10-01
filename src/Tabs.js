import React from 'react';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';


export class SlideTabs extends React.Component {

  constructor(props) {
    super(props);
    this.margin = 8;
    this.state = {
      tabIndex: 0,
      barWidth: '10px',
      barMargin: '8px',
    }
  }
  componentDidMount() {
    this.handleTabChange.call(this, 0);
  }

  handleTabChange(index) {
    const tabWidths = _.chain(this.refs)
      .values().slice(0, index)
      .map(ref => ReactDOM.findDOMNode(ref).offsetWidth)
      .sum().value();

    const currentTab = ReactDOM.findDOMNode(this.refs[`tab${index}`]);

    const marginOffset = index > 0
      ? (this.margin * (index * 2)) + this.margin
      : this.margin;

    this.setState({
      barWidth: currentTab.offsetWidth,
      barMargin: tabWidths + marginOffset,
      tabIndex: index
    })
  }

  render() {

    const tabBodyOffset = `${this.state.tabIndex * -100}%`;
    const tabBodyWidth = `${React.Children.count(this.props.children) * 100}%`;
    const { inkbarColor, labelColor, labelActiveColor, style } = this.props;

    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', height: '48px', ...style}}>
          {React.Children.map(this.props.children, (child, index) =>
            React.cloneElement(child, {
              ref: `tab${index}`,
              active: index === this.state.tabIndex,
              labelColor: labelColor,
              labelActiveColor: labelActiveColor,
              onClick: () => this.handleTabChange.call(this, index),
            })
          )}
        </div>

        <Inkbar
          containerStyle={{backgroundColor: style.backgroundColor}}
          inkbarStyle={{
            background: inkbarColor,
            width: this.state.barWidth,
            marginLeft: this.state.barMargin
          }}
        />

        <div style={{width: '100%', overflow: 'hidden'}}>
          <div style={{
            display: 'flex',
            position: 'relative',
            width: tabBodyWidth,
            left: tabBodyOffset,
            transition: 'left .3s ease'
          }}>
            {React.Children.map(this.props.children, (child) =>
              <div style={{width: `${100 / React.Children.count(this.props.children)}%`}}>
                {React.Children.only(child.props.children)}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

SlideTabs.defaultProps = {
  inkbarColor: '#FF5722',
  labelColor: '#9E9E9E',
  labelActiveColor: '#FF5722',
  style: {
    borderBottom: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(0,0,0,0.0)',
  }
};


export class SlideTab extends React.Component {

  render() {
    const {label, active, labelColor, labelActiveColor} = this.props;
    return (
      <div
        style={{
          flex: '0 0 auto',
          display: 'flex',
          fontWeight: 'bold',
          alignItems: 'center',
          height: '100%',
          margin: '0 8px',
          cursor: 'pointer',
          color: active ? labelActiveColor : labelColor,
          transition: 'color .3s ease'
        }}
        onClick={this.props.onClick}
      >
        <div style={{flex: '0 0 auto'}}>
          {label}
        </div>
      </div>
    )
  }
}


const Inkbar = ({containerStyle, inkbarStyle}) => (
  <div style={{borderBottom: '1px solid rgba(0,0,0,0.2)', ...containerStyle}}>
    <div
      style={{
        transition: 'all .3s ease',
        webkitTransition: 'all .3s ease',
        height: '4px',
        ...inkbarStyle
      }}
    />
  </div>
)

