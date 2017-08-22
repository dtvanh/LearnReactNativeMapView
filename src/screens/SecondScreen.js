import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

class SecondScreen extends Component {

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
                <Text> Second Screen </Text>
            </View>
        )
    }
}

export default SecondScreen;
