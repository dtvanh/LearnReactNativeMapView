import React, {Component} from 'react';
import {
    WebView,
} from 'react-native';

const sourceWeb = require('./')

class LoadMapOfflineScreen extends Component {

    constructor() {
        super();
    }

    render() {

        return (
            <WebView
                source={{uri: 'https://github.com/facebook/react-native'}}
                style={{marginTop: 20}}
            />
        )
    }
}

export default LoadMapOfflineScreen;
