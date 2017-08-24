var draw, polyFeature, _layers = [], vectorLayer, map, esrijsonFormat = new ol.format.EsriJSON();

//get data from RN
document.addEventListener("message", function (event) {
    let message = JSON.parse(event.data);
    if (message.type === "Polygon") {
        drawPolygon(message.data);
    }
    vectorSource.addFeature(polyFeature);
}, false);

function drawPolygon(dataOffline) {
    let data = dataOffline;
    if (!data) {
        data = [];
    }
    polyFeature.setGeometry(new ol.geom.Polygon(data));
    polyFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
}

polyFeature = new ol.Feature({});
var vectorSource = new ol.source.Vector({});
vectorSource.addFeature(polyFeature);
vectorLayer = new ol.layer.Vector({
    source: vectorSource
});
var osmSource = new ol.source.OSM({
    crossOrigin: 'anonymous'
});
var layer = new ol.layer.Tile({
    source: osmSource
});
_layers.push(layer);
_layers.push(vectorLayer);

map = new ol.Map({
    layers: _layers,
    target: document.getElementById('olMap'),
    controls: ol.control.defaults({
        attributionOptions: ({
            collapsible: false
        })
    }),
    view: new ol.View({
        center: ol.proj.transform(
            [153.026330, -27.469695], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13
    })
});

var typeShape = document.getElementById('typeShape');
function addInteraction() {
    var value = typeShape.value;
    if (value !== 'None') {
        draw = new ol.interaction.Draw({
            source: vectorSource,
            type: /** @type {ol.geom.GeometryType} */ (typeShape.value)
        });
        map.addInteraction(draw);
    }
}

typeShape.onchange = function () {
    map.removeInteraction(draw);
    addInteraction();
};
addInteraction();

draw.on('drawstart', function (evt) {
    console.log("Drawstart test");
    var geometry = evt.feature.getGeometry();
    console.log("Geometry: " + geometry.getType());
})

draw.on('drawend', function (evt) {
    var feature = evt.feature;
    feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
    var payload = '[' + esrijsonFormat.writeFeature(feature, {
        featureProjection: map.getView().getProjection()
    }) + ']';
    var featureType = feature.getGeometry().getType();
    var obj = JSON.parse(payload);
    var rings = obj[0].geometry.rings[0];
    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    let message = JSON.stringify({
        type: featureType,
        data: rings
    })
    window.postMessage(message);
});