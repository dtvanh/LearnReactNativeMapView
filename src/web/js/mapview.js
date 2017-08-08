let osmSource = new ol.source.OSM();
let _layers = [];

let omsSource = new ol.layer.Tile({
    source: osmSource,
    tileLoadFunction: function(imageTile, src) {
      console.log(src);
    }
  });

_layers.push(omsSource);

var map = new ol.Map({
    layers: _layers,
    target: 'map',
    controls: ol.control.defaults({
      attributionOptions: ({
        collapsible: false
      })
    }),
    view: new ol.View({
      center: ol.proj.transform(
          [-0.1275, 51.507222], 'EPSG:4326', 'EPSG:3857'),
      zoom: 10
    })
});

// *********** REGISTER EVENTS ***********
