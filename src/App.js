import React, { Component } from 'react';
import mapWidjet from './yandex-map-widget';
import './App.css';


class App extends Component {

  componentDidMount() {
    mapWidjet.load().then(maps => {
      new maps.Map('mymap', {
        center: [54.94873814863049, 43.33372592926026],
        zoom: 16
      });
    })
      .catch(error => console.log('Failed to load Yandex Maps', error));
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
