import realm from '../db/realm';

/*
    Get all available tile map links with user input
*/

const getTileMapLinks = (
    config,
    defaultPatternUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png') => {

    let boundaries = config.boundaries;
    let zoomMin = config.zoomRange[0];
    let zoomMax = config.zoomRange[1];

    let links = [];

    for (let z = zoomMin; z <= zoomMax; z++) {

        // North, West
        let xNW = getXTileByLng(boundaries[1], z);
        let yNW = getYTileByLat(boundaries[0], z);

        // South, East
        let xSE = getXTileByLng(boundaries[3], z);
        let ySE = getYTileByLat(boundaries[2], z);

        for (let i = xNW; i <= xSE; i++) {
            for (let j = yNW; j <= ySE; j++) {

                let replaces = {
                    '{x}' : i,
                    '{y}' : j,
                    '{z}' : z
                };

                let __link = defaultPatternUrl.replace(/{\w+}/g, function(matches) {

                    return replaces[matches] || matches;
                })

                let info = {
                    zoomLevel: z,
                    columnIndex: j,
                    rowIndex: i,
                    link: __link
                }

                links.push(info);
            }
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

    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
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
