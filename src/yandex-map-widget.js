/* global ymaps */

export default {

  loadApi(src) {
    src = src || '//api-maps.yandex.ru/2.1/?lang=ru_RU';

    const getNsParamValue = () => {
      var results = RegExp('[\\?&]ns=([^&#]*)').exec(src);
      return results === null ? '' :
        decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    this.promise = this.promise || new Promise((resolve, reject) => {
      let elem = document.createElement('script');
      elem.type = 'text/javascript';
      elem.src = src;
      elem.onload = resolve;
      elem.onerror = e => reject(e);
      document.body.appendChild(elem);
    })
      .then(() => {
        const ns = getNsParamValue();
        console.log(ns);
        if (ns && ns !== 'ymaps') {
          (1, eval)(`var ymaps = ${ns};`); // eslint-disable-line
        }
        return new Promise(resolve => {
          ymaps.ready(resolve)
        });
      });

    return this.promise;
  },

  createMap(mapContainerID, points) {
    if (window.ymaps !== undefined) {
      let center = [55.751430, 37.618832];
      const zoom = 16;

      if (points.length === 1) {
        center = [points[0].lat, points[0].lon];
      }

      const map = new ymaps.Map(mapContainerID, {
        center,
        zoom
      });

      const placemarks = createPlacemarks(points);
      map.geoObjects.add(placemarks);

      if (points.length > 1) {
        map.setBounds(placemarks.getBounds());
      }

    }
    else {
      throw new Error('The map API is NOT loaded yet');
    }
  }

};

function createPlacemarks(points) {
  const placemarks = new ymaps.GeoObjectCollection();

  points.forEach(p => {
    const marker = new ymaps.Placemark([p.lat, p.lon], {
      hintContent: p.name
      // balloonContent: p.desc
    });

    marker.events.add('click', function (e) {
      console.log(e);
    });

    placemarks.add(marker);
  });

  return placemarks;
}
