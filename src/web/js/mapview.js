var osmSource = new ol.source.OSM();
var _layers = [];

var omsSource = new ol.layer.Tile({
    source: osmSource
  });

_layers.push(omsSource);

// omsSource.setTileLoadFunction(function(image, link) {
//     console.log(link);
//     image.Y().src = link;
// });

var map = new ol.Map({
layers: _layers,
target: 'map',
controls: ol.control.defaults({
  attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
    collapsible: false
  })
}),
view: new ol.View({
  center: ol.proj.transform(
      [-0.1275, 51.507222], 'EPSG:4326', 'EPSG:3857'),
  zoom: 10
})
});

// *********** ADD POINTS ***********



//*********** REGISTER EVENTS ***********
let dataPassed = document.getElementById("data-passed");
dataPassed.innerHTML = 'RJJJ';

document.addEventListener("message", function(event) {
    console.log("Received post message", event);

    dataPassed.innerHTML = event.data;
}, false);
