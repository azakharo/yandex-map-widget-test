/* global ymaps */

export default {

  load(src) {
    src = src || '//api-maps.yandex.ru/2.1/?lang=en_RU';

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

  createMap(mapContainerID, center, zoom) {
    new ymaps.Map(mapContainerID, {
      center,
      zoom
    });
  }

};
