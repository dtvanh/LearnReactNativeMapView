import React, {Component} from "react";
import {AppRegistry, Text, View, TouchableHighlight, WebView, Alert} from "react-native";
import RNFetchBlob from 'react-native-fetch-blob';
import TestFunction from './src/TestFunction';
import realm from './src/db/realm';
import { downloadImage, downloadListImages } from './src/util/Util';

const mapViewContent = require('./src/web/mapview.html');

export default class WevViewApp extends Component {

    componentDidLoad() {

        downloadListImages();
    }

    constructor( props ) {
        super( props );

        this.webView = null;
        this.state = {
            link: 'Image Link'
        }
    }

    onMessage( event ) {
        console.log( "On Message", event.nativeEvent.data );


        let message = JSON.parse(event.nativeEvent.data);

        console.log(event.nativeEvent.data);

        // if (message.type === 'GET_TILE_MAP_IMAGE') {
        //
        //
        //     if (false) {
        //
        //
        //     } else {
        //         let imagePath = '';
        //
        //         downloadImage(message.tileMapInfo.link)
        //         .then((resp) => {
        //             imagePath = resp.path();
        //             return resp.readFile('base64')
        //         })
        //         .then((base64Str) => {
        //             let image = 'data:image/png;base64,' + base64Str;
        //
        //             realm.write(() => {
        //                 realm.create('MapTile', {
        //                     ...message.tileMapInfo,
        //                     base64String: image,
        //                     creationDate: new Date(),
        //                     updatedDate: new Date()});
        //                 });
        //
        //             // Pass data back to WebView
        //             var request = {
        //                 type: 'RENDER',
        //                 link: message.tileMapInfo.link,
        //                 base64Str: image
        //             }
        //             let messageStr = JSON.stringify(request);
        //
        //             this.webView.postMessage( messageStr );
        //
        //             //return RNFetchBlob.fs.unlink(imagePath);
        //         })
        //     }
        //
        // } else {
        //     // Do nothing
        // }





        /*

        //    .then((resp) => {
        //        imagePath = resp.path();
           //
        //        return resp.readFile('base64')
        //    })
        //    .then((base64Data) => {
           //
        //        return RNFetchBlob.fs.unlink(imagePath)
        //    })
        */
    }

    sendPostMessage(tileMap) {

        downloadListImages();
         // json gets the string "2016-08-26 etc..."
        //newfoo = JSON.parse(json);  // newfoo is now a string, NOT a "Date" object.

        //this.webView.postMessage( 'Fuckyou' );

    }

    render() {

        return (
            <View style={{flex: 1}}>
                <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
                    <Text style={{color: 'white'}}>Send Post</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
                    <Text style={{color: 'white'}}>Save Tile Map</Text>
                </TouchableHighlight>

                <WebView
                    style={{flex: 1}}
                    source={mapViewContent}
                    ref={( webView ) => this.webView = webView}
                    onMessage={this.onMessage.bind(this)}
                />
            </View>
        );
    }
}

//AppRegistry.registerComponent( 'InteractMapView', () => TestFunction );
AppRegistry.registerComponent( 'InteractMapView', () => WevViewApp );
