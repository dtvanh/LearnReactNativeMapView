import React, { Component } from 'react';
import MapView from './components/MapView';
import {
    View,
    WebView,
    TouchOpacity
} from 'react-native';

class App extends Component {

    render() {

        return (
            <View style={{
                flex: 1.0
            }}>
                <MapView style={{
                    flex: 0.5
                }}/>

            </View>
        )
    }
}

export default App;
