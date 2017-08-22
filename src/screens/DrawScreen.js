import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

class DrawScreen extends Component {

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
                <Text> DrawScreen </Text>
            </View>
        )
    }
}

export default DrawScreen;
