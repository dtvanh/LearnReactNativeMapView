import React, {Component} from 'react';
import {
    WebView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import realm from '../db/realm';

const sourceWebOffline = require('../web/mapview_offline_mode.html');


class LoadMapOfflineScreen extends Component {

    static navigationOptions = {
        title: 'Offline Map'
    };
    
    constructor() {
        super();

        //this._renderGroupButtons.bind(this);
        this.webView = null;
    }

    render() {
        // source={{uri: 'https://facebook.github.io/react-native/docs/webview.html'}}
        return (
            <View style={styles.container}>
            { this._renderGroupButtons() }
                <WebView
                    source={sourceWebOffline}
                    ref={( webView ) => this.webView = webView}
                    onMessage={this._onMessage}
                />

            </View>
        )
    }

    _renderWebViewForAndroid() {

    }

    _renderGroupButtons() {

        const { btnGroupContainer, btn } = styles;

        return (
            <View style={btnGroupContainer}>

                <TouchableOpacity onPress={this._refreshWebView.bind(this)}>
                    <Text style= { btn }>REFRESH</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._loadOfflineFromRealm.bind(this)}>
                <Text style= { btn }>LOAD OFFLINE DATA</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._clearOfflineData.bind(this)}>
                    <Text style= { btn }>CLEAR WEB LOCALSTORAGE</Text>
                </TouchableOpacity>

            </View>
        )
    }

    //*********************** WEB EVENT LISTENER ***********************
    _onMessage(event) {

        Alert.alert(event.nativeEvent.data);
        //console.log( "On Message", event.nativeEvent.data );
    }

    //*********************** ACTIONS ***********************
    _refreshWebView() {

        this.webView.reload();
    }

    _loadOfflineData() {

    }

    _clearOfflineData() {

        let message = JSON.stringify({
            type: 'CLEAR_LOCAL_STORAGE',
        })

        this.webView.postMessage(message);
    }

    //*********************** HELPER ***********************
   _passRefreshRequest() {

       let message = JSON.stringify({
           type: 'REFRESH'
       });

       this.webView.postMessage(message);

    }

    _loadOfflineFromRealm() {
        let filterStr = `zoomLevel = ${14} or zoomLevel = ${13} or zoomLevel = ${12}`;

        let mapTiles = realm.objects('MapTile').filtered(filterStr);

        for (let i = 0; i < mapTiles.length; i ++) {

            let message = JSON.stringify({
                type: 'CACHE_DATA',
                data: {
                    key: mapTiles[i].link,
                    value: mapTiles[i].base64String
                }
            })

            this.webView.postMessage(message)
        }
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1.0,
    },

    btnGroupContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#BABEB9'
    },

    webviewContainer: {
        flex: 0.7,
        alignItems: 'center',
    },

    btn: {
        fontSize: 10,
        padding: 5,
    }
});

export default LoadMapOfflineScreen;
