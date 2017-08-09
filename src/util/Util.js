import RNFetchBlob from 'react-native-fetch-blob';
import realm from '../db/realm';

const downloadImage = (url) => {


    let imagePath = null

    let fetcher = RNFetchBlob.config({
     fileCache : true,
     appendExt : 'png'
    });

    let dir = RNFetchBlob.fs.dirs.DocumentDir;
    debugger;

    return fetcher.fetch('GET', url);
    //    .then((resp) => {
    //        imagePath = resp.path();
       //
    //        return resp.readFile('base64')
    //    })
    //    .then((base64Data) => {
       //
    //        return RNFetchBlob.fs.unlink(imagePath)
    //    })


    // @WARNING: Must unlink after done with file
}

const convertToBase64String = (localPath) => {


};


export {downloadImage};
