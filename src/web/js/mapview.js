
var osmSource = new ol.source.OSM();
var _layers = [];
var isOffline = true;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two second later');
}

var links = [];

/********* Config Source Map *********/
osmSource.setTileLoadFunction(function(image, link) {
    image.Y().src = link;

    links.push(link);
    //window.postMessage(JSON.stringify(link));
    console.log(link);
//    if (isOffline) {
//
//        if (localStorage.getItem(link)) {
//
//            image.Y().src = localStorage.getItem(link);
//        } else {
//
//            let pattern = /([0-9]+)\/([0-9]+)\/([0-9]+)/g;
//            let match = pattern.exec(link);
//
//            let info = {};
//
//            if (match != null) {
//              info.zoomLevel = parseInt(match[1]);
//              info.columnIndex = parseInt(match[2]);
//              info.rowIndex = parseInt(match[3]);
//              info.link = link;
//            }
//
//            // Trigger Native Download
//            let message = {
//                type: 'GET_TILE_MAP_IMAGE',
//                tileMapInfo: info
//            }
//
//            //window.postMessage(JSON.stringify(message));
//        }
//    } else {
//
//    }
});

osmSource.setTileLoadFunction(osmSource.getTileLoadFunction());



var layer = new ol.layer.Tile({
    source: osmSource
  });

_layers.push(layer);

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

if (typeof(Storage) !== "undefined") {
    console.log('LocalStorage');
} else {
    console.log('Do not support LocalStorage');
}

//*********** REGISTER EVENTS ***********
let dataPassed = document.getElementById("data-passed");


document.addEventListener("message", function(event) {
    console.log("Received post message", event);

    window.postMessage(JSON.stringify(links));

    // let dataParse = JSON.parse(event.data);
    //
    // if (dataParse.type === 'RENDER') {
    //
    //     localStorage.setItem(dataParse.link, dataParse.base64Str)
    //
    // } else {
    //     alert('Do anotherthing');
    // }
    //
    // localStorage.setItem('imageBase64', event.data);
    // map.refresh();
    // zoom();
}, false);

function zoom() {
    map.getView().setZoom(12);
}

function moveToLatLng() {

}
