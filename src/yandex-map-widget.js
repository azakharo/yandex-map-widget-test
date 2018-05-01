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

      const mapContainer = document.getElementById(mapContainerID);
      mapContainer.style.minWidth = "320px";
      mapContainer.style.minHeight = "480px";

      const map = new ymaps.Map(mapContainerID, {
        center,
        zoom
      });

      const placemarks = createPlacemarks(points);
      map.geoObjects.add(placemarks);

      if (points.length > 1) {
        map.setBounds(placemarks.getBounds());
      }

      Tooltip.bindEvents();

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

    marker.events.add('click', () => {
      Tooltip.point = p;
    });

    placemarks.add(marker);
  });

  return placemarks;
}


var Tooltip = {
  tooltip: undefined,
  point: null,

  bindEvents: function() {
    Tooltip.tooltip = document.getElementById('tooltip');
    Tooltip.tooltip.addEventListener('click', Tooltip.hide);
    window.addEventListener('resize', Tooltip.hide);

    document.addEventListener("click", function(e){
      if (Tooltip.point) {
        Tooltip.hide();
        Tooltip.show(e.pageX, e.pageY);
        Tooltip.point = null;
      }
    });
  },

  show: function(x, y) {
    const tip = Tooltip.point.name;
    const tooltip = Tooltip.tooltip;

    tooltip.innerHTML = tip ;

    if( window.innerWidth < tooltip.offsetWidth * 1.5 ) {
      tooltip.style.maxWidth = (window.innerWidth / 2) + 'px';
    }
    else {
      tooltip.style.maxWidth = 320 + 'px';
    }

    let pos_left = x - tooltip.offsetWidth / 2;
    let pos_top  = y - tooltip.offsetHeight - 20;

    tooltip.className = '';

    // console.log(`(${pos_left}, ${pos_top})`);

    if( pos_left < 0 ) {
      pos_left = x;
      tooltip.className += ' left';
    }

    if (pos_left + tooltip.offsetWidth > window.innerWidth) {
      pos_left = x - tooltip.offsetWidth;
      tooltip.className +=' right';
    }

    if( pos_top < 0 ) {
      pos_top  = y + 10;
      tooltip.className += ' top';
    }

    tooltip.style.left = pos_left + 'px';
    tooltip.style.top = pos_top + 'px';

    tooltip.className += ' show';
  },

  hide: function() {
    Tooltip.tooltip.className = Tooltip.tooltip.className.replace('show', '');
  }

};
