import React, {Component} from "react";
import {AppRegistry, Text, View, TouchableHighlight, WebView, Alert} from "react-native";
import RNFetchBlob from 'react-native-fetch-blob';
import TestFunction from './src/TestFunction';
import { StackNavigator } from 'react-navigation';
import realm from './src/db/realm';
import { downloadImage, downloadListImages, getTileMapLinks } from './src/util/Util';
import DownloadOfflineDataScreen from './src/DownloadOfflineDataScreen';
import LoadMapOfflineScreen from './src/LoadMapOfflineScreen';
import RootScreen from './src/screens/RootScreen';
import SecondScreen from './src/screens/SecondScreen';



const App = StackNavigator({
    Root: { screen: RootScreen },
    Second: { screen: SecondScreen }
  });

AppRegistry.registerComponent( 'InteractMapView', () => App );
