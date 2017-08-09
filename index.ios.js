import React, {Component} from "react";
import {AppRegistry, Text, View, TouchableHighlight, WebView, Alert} from "react-native";
import TestFunction from './src/TestFunction';

const mapViewContent = require('./src/web/mapview.html');

export default class WevViewApp extends Component {

    constructor( props ) {
        super( props );

        this.webView = null;
        this.state = {
            link: 'Image Link'
        }
    }

    onMessage( event ) {
        console.log( "On Message", event.nativeEvent.data );
        this.setState({link: event.nativeEvent.data});
    }

    sendPostMessage() {
        this.webView.postMessage( "Post message from react native" );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
                    <Text style={{color: 'white'}}>{this.state.link}</Text>
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

AppRegistry.registerComponent( 'InteractMapView', () => TestFunction );
//AppRegistry.registerComponent( 'InteractMapView', () => WevViewApp );
