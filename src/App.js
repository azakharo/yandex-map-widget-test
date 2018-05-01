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
              name: 'Лесная поляна',
              desc: 'место отдыха молодёжи',
              lat: 54.934095,
              lon: 43.305741,
              address: 'Лесная, 21',
              tel: '91659',
              site: 'http://sarov.info'
            },
            {
              name: 'Берёзовая роща',
              desc: 'парк',
              lat: 54.948128,
              lon: 43.331607,
              address: 'Берёзовая, 6',
              tel: '97527',
              site: 'https://sarov-itc.ru'
            },
            {
              name: 'Улица коммунистов',
              desc: 'историческое место',
              lat: 54.916773,
              lon: 43.337682,
              address: 'Шверника, 9',
              tel: '69091',
              site: 'http://sarov.net/news'
            }
          ]);

        mapWidjet.createMap('mymap2',
          [
            {
              name: 'Грудцино1',
              desc: 'точка 1',
              lat: 55.934095,
              lon: 43.305741,
              address: 'Огурцова, 5',
              tel: '55091',
              site: 'https://news.yandex.ru'
            },
            {
              name: 'Володинские пруды',
              desc: 'точка 2',
              lat: 55.948128,
              lon: 43.331607,
              address: 'Белоусова, 15',
              tel: '23691',
              site: 'http://soccer365.ru'
            }
          ]);

      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="App">
        <div id="mymap" className="App-intro"></div>
        <div id="mymap2" className="App-intro2"></div>
      </div>
    );
  }
}

export default App;
