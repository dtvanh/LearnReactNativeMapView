import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
        justifyContent: 'space-around'
    },

    btn: {
        marginTop: 20,
        fontSize: 30

    }

})

class RootScreen extends Component {

    static navigationOptions = {
        title: 'MOB-34',
      };

    constructor(props) {
        super(props);
    }

    render() {

        const { navigate } = this.props.navigation;
        const { container, btn} = styles;

        return (
            <View style={container}>
                
                <TouchableOpacity
                    onPress= {() => {
                        navigate('DownloadMap');
                    }}
                >
                    <Text style={btn}>Download Offline</Text>    
                </TouchableOpacity>

                <TouchableOpacity
                    onPress= {() => {
                        navigate('LoadMap');
                    }}
                >
                    <Text style={btn}>Load Offline</Text>    
                </TouchableOpacity>

                <TouchableOpacity
                    onPress= {() => {
                        navigate('DrawOnMap');
                    }}
                >
                    <Text style={btn}>Draw Map</Text>    
                </TouchableOpacity>                
            </View>
        )
    }
}

export default RootScreen;
