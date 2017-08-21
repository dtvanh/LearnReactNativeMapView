const REFRESH = 'REFRESH';
const RENDER = 'RENDER';
const CACHE_DATA = 'CACHE_DATA';
const CLEAR_LOCAL_STORAGE = 'CLEAR_LOCAL_STORAGE';

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

    let linkFormated = link.replace(/(https:\/\/([a-c]))./gi, "https://");

    if (localStorage.getItem(linkFormated)) {

        image.Y().src = localStorage.getItem(linkFormated);
    }
});




var layer = new ol.layer.Tile({
    source: osmSource
  });

_layers.push(layer);

var map = new ol.Map({
    layers: _layers,
    target: 'map',
    controls: ol.control.defaults({
      attributionOptions:({
        collapsible: false
      })
    }),
    view: new ol.View({
      center: ol.proj.transform(
          [153.026330,-27.469695], 'EPSG:4326', 'EPSG:3857'),
      zoom: 12
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

    let message = JSON.parse(event.data);

    if (message.type === RENDER) {

        dataPassed.innerHTML = message.data;
    } else if (message.type === REFRESH) {
        // dataPassed.innerHTML = 'asdfjklajsdfjkakjsdfalsdkfj';
        // window.postMessage('yeahyeah cai nay tu webview nek !')

        map.refresh();
    } else if (message.type === CACHE_DATA) {

        saveTileMapToLocalStorage(message.data.key, message.data.value);
    } else if (message.type === CLEAR_LOCAL_STORAGE) {

        clearLocalStorage();
    }
}, false);

/****************** HELPER ******************/
function saveTileMapToLocalStorage(key, value) {

    try {
      localStorage.setItem(key, value);
    } catch(e) {
      if (isQuotaExceeded(e)) {
          alert('LocalStorage is FULL');
      }
    }
}

function getTileMap(key) {
    return localStorage.getItem(key);
}

function clearLocalStorage() {
    localStorage.clear();
}

function clearItemWithKey(key) {
    localStorage.removeItem(key);
}

function formatLink(link) {
    let result = '';

    return result;
}
