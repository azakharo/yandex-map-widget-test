import React, { Component } from 'react';
import mapWidjet from './yandex-map-widget';
import './App.css';


class App extends Component {

  componentDidMount() {
    mapWidjet.loadApi()
      .then(() => {
        mapWidjet.createMap('mymap', [54.94873814863049, 43.33372592926026], 16);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="App">
        <div id="mymap" className="App-intro"></div>
      </div>
    );
  }
}

export default App;
