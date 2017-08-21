var polyFeature,vectorLayer,map,arrayRing;
arrayRing = [
        [
            [10.689697265625, -25.0927734375],
            [34.595947265625, -20.1708984375],
            [13.502197265625, -39.1552734375],
            [10.689697265625, -25.0927734375]
        ],
        [
        		[28.048095703125, -26.015625],
            [38.814697265625, -35.6396484375],
            [13.502197265625, -39.1552734375],
            [28.048095703125, -26.015625]
        ]
    ];
drawPolygon(arrayRing);
function drawPolygon(array){
	//Holds the Polygon feature  
	polyFeature = new ol.Feature({
		geometry: new ol.geom.Polygon(array)
	});
	polyFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
}
var vectorSource = new ol.source.Vector({});
vectorSource.addFeature(polyFeature);
//A vector layer to hold the features
vectorLayer = new ol.layer.Vector({
    source: vectorSource
		});

var draw = new ol.interaction.Draw({
  source: vectorSource,
  type: /** @type {ol.geom.GeometryType} */ ('Polygon')
});
var select = new ol.interaction.Select();
select.setActive(false);
var selected = select.getFeatures();

var modify = new ol.interaction.Modify({
  features: selected
});
modify.setActive(false);

var typeSelect = document.getElementById('type');

typeSelect.onchange = function(e) {
  draw.setActive(typeSelect.value === 'DRAW');
  select.setActive(typeSelect.value === 'MODIFY');
  modify.setActive(typeSelect.value === 'MODIFY');
};

var dirty = {};

selected.on('add', function(evt) {
  var feature = evt.element;
  feature.on('change', function(evt) {
    dirty[evt.target.getId()] = true;
  });
});

selected.on('remove', function(evt) {
  var feature = evt.element;
  var fid = feature.getId();
  if (dirty[fid] === true) {
    var payload = '[' + esrijsonFormat.writeFeature(feature, {
      featureProjection: map.getView().getProjection()
    }) + ']';
    var url = serviceUrl + layer + '/updateFeatures';
    $.post(url, { f: 'json', features: payload }).done(function(data) {
      var result = JSON.parse(data);
      if (result.updateResults && result.updateResults.length > 0) {
        if (result.updateResults[0].success !== true) {
          var error = result.updateResults[0].error;
          alert(error.description + ' (' + error.code + ')');
        } else {
          delete dirty[fid];
        }
      }
    });
  }
});
map = new ol.Map({
	interactions: ol.interaction.defaults().extend([draw]),
    target: document.getElementById('olMap'),
    layers: [
    new ol.layer.Tile({
        source: new ol.source.TileJSON({
            url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
            crossOrigin: 'anonymous'
        })
    }),
    vectorLayer //When the vector layer is used both the features displays correctly.
    //imageLayer //When the image layer is in use only the point feature is displayed.
    ],
    view: new ol.View({
        center: [2952104.019976033, -3277504.823700756],
        zoom: 4
    })
});