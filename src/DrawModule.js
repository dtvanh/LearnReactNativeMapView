import React, { Component } from 'react';
import {
    WebView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import realm from './db/realm';

class DrawModule extends Component {

  constructor(props) {
    
    super(props);

    this.webview = null;
  }

  render() {
    const mapHtml = require('./web/drawFeatures.html');
    return (
      <View style={styles.container}>
      { this._renderGroupButtons() }
      <WebView
        source={mapHtml}
        style={{marginTop: 20}}
        ref={( webView ) => this.webView = webView}
        onMessage={this._onMessage}
      />
      </View>
    );
  }

  _renderGroupButtons() {

        return (
            <View style={styles.btnGroupContainer}>
                <TouchableOpacity onPress={this._loadOfflineFromRealm.bind(this)}>
                    <Text>LOAD OFFLINE DATA</Text>
                </TouchableOpacity>
            </View>
        )
    }

  _loadOfflineFromRealm() {

        let polygons = realm.objects('Polygons');
        for (let i = 0; i < polygons.length; i ++) {

            let message = JSON.stringify({
                type: 'CACHE_DATA',
                data: polygons[i]
            })
            this.webView.postMessage(message)
        }
    }

  _onMessage(event) {    
    Alert.alert("DATA: " + event.nativeEvent.data);
    realm.write(() => {
        realm.create('Polygons', {
            data: event.nativeEvent.data
        });
    });
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
    }
});

export default DrawModule;