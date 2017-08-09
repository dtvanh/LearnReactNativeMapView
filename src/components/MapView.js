// @NOTE: Consider to delete or not
import React, { Component } from 'react';
import {
    WebView,
    StyleSheet,
    Alert,
    View,
    TouchableHighlight,
    Text
} from 'react-native';

const mapViewContent = require('../web/mapview.html');

class MapView extends Component {

    constructor() {
        super();
        this.webView = null;
    }

    render() {

        let _htmlContent = `
           <div id="myContent">
               This is my name
           </div>
       `;

       let jsCode = `
        webViewAlert();
        //document.querySelector('#myContent').style.backgroundColor = 'red';
       `;

        const {container} = styles;

        return (
            <View>
                <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this._onComplete()}>
                    <Text style={{color: 'white'}}>Send post message from react native</Text>
                </TouchableHighlight>

                <WebView
                    ref={( webView ) => {
                        this.webView = webView;
                    }}
                    source = {mapViewContent}
                    onMessage={this._onMessage}
                    style= {{
                        backgroundColor: 'green'
                    }}
                />
            </View>
        )
    }

    _onComplete() {
        debugger;
        
    }

    _onMessage(data) {

        console.log(data);
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1.0
    }
});

export default MapView;
