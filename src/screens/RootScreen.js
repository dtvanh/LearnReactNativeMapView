import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text
} from 'react-native';

class RootScreen extends Component {

    static navigationOptions = {
        title: 'Root',
      };

    constructor(props) {
        super(props);
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={{
                flex: 1.0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red'
            }}>
                <TouchableHighlight
                    onPress= {() => {
                        navigate('Second');
                    }}
                >
                    <Text>Root View</Text>    
                </TouchableHighlight>

                
            </View>
        )
    }
}

export default RootScreen;
