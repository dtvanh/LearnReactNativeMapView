import React, {Component} from "react";
import {AppRegistry, Text, View, TouchableHighlight, WebView, Alert} from "react-native";
import RNFetchBlob from 'react-native-fetch-blob';
import TestFunction from './src/TestFunction';
import realm from './src/db/realm';
import { downloadImage, downloadListImages, getTileMapLinks } from './src/util/Util';
import DownloadOfflineDataScreen from './src/DownloadOfflineDataScreen';
import LoadMapOfflineScreen from './src/LoadMapOfflineScreen';

const mapViewContent = require('./src/web/mapview.html');

export default class WevViewApp extends Component {

    componentDidLoad() {

    }

    constructor( props ) {
        super( props );

        getTileMapLinks({
            boundaries: [39.741710, -92.675564, 37.366217, -86.067470],
            zoomLevel: 7
        })
    }

    render() {

        return (
            <View style={{
                flex: 1,
                alignItems: 'center'}}>
                <Text> Testing </Text>
            </View>
        );
    }
}

AppRegistry.registerComponent( 'InteractMapView', () => DownloadOfflineDataScreen );
