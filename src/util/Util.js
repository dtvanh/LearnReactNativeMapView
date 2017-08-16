import realm from '../db/realm';

const downloadImages = (url) => {
    
}

const getTileMapLinks = (
    config,
    defaultPatternUrl = 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png') => {

    let boundaries = config.boundaries;
    let zoomLevel = config.zoomLevel;

    // North, West
    let xNW = getXTileByLng(boundaries[1], zoomLevel);
    let yNW = getYTileByLat(boundaries[0], zoomLevel);

    // South, East
    let xSE = getXTileByLng(boundaries[3], zoomLevel);
    let ySE = getYTileByLat(boundaries[2], zoomLevel);

    let links = [];

    for (let i = xNW; i <= xSE; i++) {
        for (let j = yNW; j <= ySE; j++) {

            let replaces = {
                '{x}' : i,
                '{y}' : j,
                '{z}' : zoomLevel
            };

            let link = defaultPatternUrl.replace(/{\w+}/g, function(matches) {

                return replaces[matches] || matches;
            })

            links.push(link);
        }
    }

    return links;
}

/*
    This function will help to convert from latitude to x tile in grid

    @param {double} lat - Latitude
    @param {int} zoom - Zoom level of ViewPort
*/
const getYTileByLat = (lat, zoom) => {

    { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
}

/*
    This function will help to convert from longtitude to y tile in grid

    @param {double} lng - Longtitude
    @param {int} zoom - Zoom level of ViewPort
*/
const getXTileByLng = (lng, zoom) => {

    return (Math.floor((lng+180)/360*Math.pow(2,zoom)));
}

export {getYTileByLat, getXTileByLng, getTileMapLinks};
