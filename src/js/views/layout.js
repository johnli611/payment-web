import React, { Component }     from 'react';
// import TopNavBar                from '../components/topNavBar';


export default class Layout extends Component {

  render() {
    console.log('MATCH', this.props);
    return (
        <div style={{
          maxWidth: '1080px',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '100%',
          position: 'relative',
          color: '#4E516A'
        }}>
          <div className="container">
            {this.props.children}
          </div>
        </div>
    );
  }
}
