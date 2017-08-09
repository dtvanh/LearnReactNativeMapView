import RNFetchBlob from 'react-native-fetch-blob';

const downloadImage = (url) => {


    let imagePath = null

    RNFetchBlob
       .config({
             fileCache : true,
             appendExt : 'png'
        })
       .fetch('GET', url)
       .then((resp) => {
           imagePath = resp.path();
           return resp.readFile('base64')
       })
    //    .then((base64Data) => {
       //
    //        return RNFetchBlob.fs.unlink(imagePath)
    //    })


    // @WARNING: Must unlink after done with file
}


export {downloadImage};
