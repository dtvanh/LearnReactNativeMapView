import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1.0
    }
});

const initState = {
    message: 'Get Location'
}

class ShowCurrentLocation extends Component {

    static navigationOptions = {
        title: 'Show Current Location',
      };

    constructor(props) {
        super(props);

        this.state = initState;
    }

    render() {

        const { navigate } = this.props.navigation;
        const { container, btn} = styles;

        return (
            <View style={container}>
                <TouchableOpacity onPress={()=> {}}>
                    <Text>{this.state.message}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _showLocation() {

        // Try to get location

        // Change the state
    }
}

export default ShowCurrentLocation;
