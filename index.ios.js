import React, {Component} from "react";
import {AppRegistry, Text, View, TouchableHighlight, WebView} from "react-native";
import App from './src/App';


const mapViewContent = require('./src/web/mapview.html');

export default class WevViewApp extends Component {

    constructor( props ) {
        super( props );

        this.webView = null;
    }

    onMessage( event ) {
        console.log( "On Message", event.nativeEvent.data );
    }

    sendPostMessage() {
        this.webView.postMessage( "Post message from react native" );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
                    <Text style={{color: 'white'}}>Send post point data from RN</Text>
                </TouchableHighlight>

                <WebView
                    style={{flex: 1}}
                    source={mapViewContent}
                    ref={( webView ) => this.webView = webView}
                    onMessage={this.onMessage}
                />
            </View>
        );
    }
}

AppRegistry.registerComponent( 'InteractMapView', () => WevViewApp );
