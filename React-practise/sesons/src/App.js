import React from 'react';
import './App.css';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: null, errorMsng: '' };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude })
      },
      err => {
        this.setState({ errorMsng: err.message });
      }
    );
  }

  render() {
    if(this.state.errorMsng && !this.state.lat) {
      return <div>Error: {this.state.errorMsng}</div>
    }
    if(!this.state.errorMsng && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>
    }
    return <div>Loading...</div>
  }
}

export default App;
