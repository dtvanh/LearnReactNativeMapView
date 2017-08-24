import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    WebView
} from 'react-native';

const sourceWeb = require('../web/show_current_location.html');

class ShowCurrentLocation extends Component {

    static navigationOptions = {
        title: 'Show Current Location',
      };

    constructor(props) {
        super(props);

        this.state = initState;
        this.watchID = null;
        this.webView = null;
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    componentDidMount() {

        this._showLocation();
        this._addWatcherForLocationChanged();
    }

    render() {

        const { navigate } = this.props.navigation;
        const { container, btn} = styles;

        return (
            <View style={styles.container}>
            { this._renderGroupButtons() }
                <WebView
                    source={sourceWeb}
                    ref={( webView ) => this.webView = webView}
                    onMessage={this._onMessage}
                />

            </View>
        )
    }

    _renderGroupButtons() {
        
        return (
            <View style={styles.btnGroupContainer}>
                <TouchableOpacity onPress={this._refreshWebView.bind(this)}>
                    <Text>REFRESH</Text>
                </TouchableOpacity>
            </View>
        )
    }


    /******************** HELPER ********************/
    _refreshWebView() {

        this._showLocation();

    }

    _showLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              var initialPosition = JSON.stringify(position);
              this.setState({initialPosition});
              this._passLocationRequest(position.coords.latitude, position.coords.longitude);
            },
            (error) => Alert.alert(error.message),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
          );

    }
    
    _addWatcherForLocationChanged() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this._passLocationRequest(position.coords.latitude, position.coords.longitude);
            this.setState({lastPosition});
        });
    }

    _passLocationRequest(lt, lg) {
        
        // coords -> longtitude latitude
        let message = JSON.stringify({
            type: 'RENDER',
            data: {
                lat: lt,
                lng: lg
            }
        });
        
        this.webView.postMessage(message);
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

const initState = {
    message: 'Get Location',
    initialPosition: 'unknown',
    lastPosition: 'unknown'
}

export default ShowCurrentLocation;
