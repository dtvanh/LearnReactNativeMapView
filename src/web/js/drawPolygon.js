var draw, polyFeature,vectorLayer,map,arrayRing, esrijsonFormat = new ol.format.EsriJSON();
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
drawPolygon();
//get data from RN
document.addEventListener("message", function(event) {
    let message = JSON.parse(event.data);
    alert("get DATA from LOCAL!");
    if (message.type === CACHE_DATA) {
        //drawPolygon(message.data);
    } 
}, false);
function drawPolygon(dataOffline){
	//Holds the Polygon feature
    let data = JSON.parse(localStorage.getItem("fData"));
    //let data = JSON.parse(dataOffline);
	if(!data){
		//localStorage.setItem("fData", JSON.stringify(arrayRing));
		data = arrayRing;
	}
	polyFeature = new ol.Feature({
			geometry: new ol.geom.Polygon(data)
		});	
	polyFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
}
var vectorSource = new ol.source.Vector({});
vectorSource.addFeature(polyFeature);
//A vector layer to hold the features
vectorLayer = new ol.layer.Vector({
    source: vectorSource
		});
map = new ol.Map({
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
typeShape.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};
addInteraction();

draw.on('drawstart', function(evt){
    console.log("Drawstart test");
    var geometry = evt.feature.getGeometry();
    console.log("Geometry: " + geometry.getType());
})

draw.on('drawend', function(evt) {
  var feature = evt.feature;
  feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
  var payload = '[' + esrijsonFormat.writeFeature(feature, {
    featureProjection: map.getView().getProjection()
  }) + ']';
  var type = feature.getGeometry().getType();
  var obj = JSON.parse(payload);
  var rings = obj[0].geometry.rings[0];
  var data = JSON.parse(localStorage.getItem("fData")) || [];
  data.push(rings);
  // Store
	localStorage.setItem("type", type);
	localStorage.setItem("fData", JSON.stringify(data));
	feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    window.postMessage(JSON.stringify(data));
    // Retrieve
  //localStorage.getItem("type");
  //save data to Realm
  
});