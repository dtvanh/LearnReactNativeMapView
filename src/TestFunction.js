import React, { Component } from 'react';
import MapView from './components/MapView';
import {
    View,
    WebView,
    TouchOpacity,
    TouchableHighlight,
    StyleSheet,
    Text,
    Alert,
    Image
} from 'react-native';
import {downloadImage} from './util/Util';

class TestFunction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            path: ''
        }

    }

    render() {

        return (
            <View style={{
                flex: 1.0,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableHighlight
                    onPress={this.onTapDownloadBtn.bind(this)}
                >
                    <Text>Download Image</Text>
                </TouchableHighlight>

                {
                    this.state.path != '' &&

                    <Image
                        style={{width: 200, height: 200}}
                        source={{uri: this.state.path}}
                    />
                }
            </View>
        )
    }

    onTapDownloadBtn() {

        downloadImage('https://c.tile.openstreetmap.org/7/65/43.png')
        .then((base64) => {

        })
    }


}

const styles = StyleSheet.create({

    container: {

    },

    red: {
        backgroundColor: 'red'
    }
});

export default TestFunction;
