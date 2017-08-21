import React, {Component} from 'react';
import {
    WebView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

const sourceWeb = require('./web/mapview_offline_mode.html');

class LoadMapOfflineScreen extends Component {

    constructor() {
        super();

        this._renderGroupButtons.bind(this);
    }

    render() {

        // return (
        //     <View style={styles.container}>
        //
        //         { this._renderGroupButtons() }
        //
        //         <View style={styles.webviewContainer}>
        //             <WebView
        //                 source={sourceWeb}
        //                 style={{marginTop: 20, flex: 1.0}}
        //             />
        //         </View>
        //     </View>
        //
        // )

        return (
            <View style={styles.container}>
            { this._renderGroupButtons() }
            <WebView
                source={sourceWeb}
            />
            </View>
        )
    }

    _renderGroupButtons() {

        return (
            <View style={styles.btnGroupContainer}>

                <TouchableOpacity onPress={this._refreshWebView}>
                    <Text>REFRESH</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._loadOfflineData}>
                    <Text>LOAD OFFLINE DATA</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //*********************** ACTIONS ***********************
    _refreshWebView() {
        Alert.alert('Refresh WebView');
    }

    _loadOfflineData() {
        Alert.alert('Load Offline Data');
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

export default LoadMapOfflineScreen;
