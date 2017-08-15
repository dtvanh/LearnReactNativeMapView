//import RNFetchBlob from 'react-native-fetch-blob';
import realm from '../db/realm';

const getTileMapLink = (
    config,
    defaultUrl = 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png') => {

    let boundaries = config.boundaries;
    let zoomLevel = config.zoomLevel;

    // South, West

    // North, East
    for (let i = point1.x; i <= point2.x; i++) {
    	for (let j = point1.y; j < 11; j ++) {

            //console.log(i + '---' + j);
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

    @param {double} lat - Longtitude
    @param {int} zoom - Zoom level of ViewPort
*/
const getXTileByLng = (lng, zoom) => {
    return (Math.floor((lng+180)/360*Math.pow(2,zoom)));
}


/********************************************************************************/
// const downloadImage = (url) => {
//
//     let imagePath = null
//
//     let fetcher = RNFetchBlob.config({
//      fileCache : true,
//      appendExt : 'png'
//     });
//
//     let dir = RNFetchBlob.fs.dirs.DocumentDir;
//     debugger;
//
//     return fetcher.fetch('GET', url);
//     //    .then((resp) => {
//     //        imagePath = resp.path();
//        //
//     //        return resp.readFile('base64')
//     //    })
//     //    .then((base64Data) => {
//        //
//     //        return RNFetchBlob.fs.unlink(imagePath)
//     //    })
//
//
//     // @WARNING: Must unlink after done with file
// }

// const downloadListImages = () => {
//     console.log('asdfasdf');
//
//    //  var listMapTiles =  ["https://c.tile.openstreetmap.org/10/511/340.png",
//    //                      "https://a.tile.openstreetmap.org/10/512/340.png",
//    //                      "https://b.tile.openstreetmap.org/10/511/341.png",
//    //                      "https://a.tile.openstreetmap.org/10/511/339.png",
//    //                      "https://b.tile.openstreetmap.org/10/510/340.png",
//    //                      "https://c.tile.openstreetmap.org/10/512/341.png",
//    //                      "https://b.tile.openstreetmap.org/10/512/339.png",
//    //                      "https://a.tile.openstreetmap.org/10/510/341.png",
//    //                      "https://c.tile.openstreetmap.org/10/510/339.png"];
//    //
//    // for (link of listMapTiles) {
//    //
//    //     console.log(link);
//    // }
//
//    // listMapTiles.map((link, index) => {
//    //
//    //     console.log(link)
//
//     //    downloadImage(link)
//     //    .then((resp) => {
//     //        imagePath = resp.path();
//     //        return resp.readFile('base64')
//     //    })
//     //    .then((base64Str) => {
//     //        let image = 'data:image/png;base64,' + base64Str;
//        //
//     //        realm.write(() => {
//     //            realm.create('MapTile', {
//     //                ...message.tileMapInfo,
//     //                base64String: image,
//     //                creationDate: new Date(),
//     //                updatedDate: new Date()});
//     //            });
//        //
//     //        // Pass data back to WebView
//     //        var request = {
//     //            type: 'RENDER',
//     //            link: message.tileMapInfo.link,
//     //            base64Str: image
//     //        }
//     //        let messageStr = JSON.stringify(request);
//        //
//     //        this.webView.postMessage( messageStr );
//        //
//     //        //return RNFetchBlob.fs.unlink(imagePath);
//     //    })
//    //}
//    //})
//
// };


export {getYTileByLat, getXTileByLng};
