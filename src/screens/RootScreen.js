import React, { Component } from 'react';
import {
    View,
} from 'react-native';

class RootScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={{
                flex: 1.0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red'
            }}>

            </View>
        )
    }
}

export default RootScreen;
