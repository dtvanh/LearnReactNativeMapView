import React, { Component } from 'react';
import {
    WebView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import realm from '../db/realm';

const mapHtml = require('../web/drawFeatures.html');

class DrawScreen extends Component {

  constructor(props) {
    
    super(props);

    this.webview = null;
  }

  render() {

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
        //let filterStr = `type = ${"Polygon"}`;
        //let polygons = realm.objects('Features').filtered(filterStr);
        let features = realm.objects('Features');
        let points = [];
        let lineStrings = [];
        let polygons = [];
        for (let i = 0; i < features.length; i ++) {
            if(features[i].type == "Point"){
                points.push(features[i].data);
            }else if(features[i].type == "LineString"){
                lineStrings.push(features[i].data);
            }else if(features[i].type == "Polygon"){
                polygons.push(JSON.parse(features[i].data));                
            }
            // let message = JSON.stringify({
            //     data: [{
            //         type: "Point",
            //         value: points
            //     },{
            //         type: "LineString",
            //         value: lineStrings
            //     },{
            //         type: "Polygon",
            //         value: polygons
            //     }]
            // })

            let message = JSON.stringify({
                type: 'Polygon',
                data: polygons
            })

            this.webView.postMessage(message)
        }
    }

  _onMessage(event) {
    let webviewData = JSON.parse(event.nativeEvent.data);
    Alert.alert("Save " + webviewData.type + " successful!");
    realm.write(() => {
        realm.create('Features', {
            type: webviewData.type,
            data: JSON.stringify(webviewData.data),
            description: webviewData.type + " Description"
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

export default DrawScreen;