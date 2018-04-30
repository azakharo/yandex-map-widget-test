import React, { Component } from 'react';
import mapWidjet from './yandex-map-widget';
import './App.css';


class App extends Component {

  componentDidMount() {
    mapWidjet.loadApi()
      .then(() => {
        mapWidjet.createMap('mymap',
          [
            {
              name: 'Лесная',
              desc: 'точка 1',
              lat: 54.934095,
              lon: 43.305741
            },
            {
              name: 'Берёзовая',
              desc: 'точка 2',
              lat: 54.948128,
              lon: 43.331607
            },
            {
              name: 'Шверника',
              desc: 'точка 3',
              lat: 54.916773,
              lon: 43.337682
            }
          ]);
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
