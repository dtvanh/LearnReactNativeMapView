import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ProgressBar from './components/ProgressBar';


const downloadImage = (url) => {

}

const imgLink = 'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg';

class TestUIScreen extends Component {

    constructor() {
        super();

        this.state = {
            progress: 0.0,
            total: 0,
            completed: 0
        }
    }

    render() {

        // setTimeout((function() {
        //     this.setState({ progress: this.state.progress + (0.2 * Math.random())});
        // }).bind(this), 1000);


        return (

            <View style= {{
                flex: 1.0,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity onPress={() => {
                    //this._downloadImage(imgLink)
                    this._downloadMulImages();
                }}>
                    <Text>Start Download</Text>
                </TouchableOpacity>
                <ProgressBar
                    fillStyle={{}}
                    backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                    style={{marginTop: 10, width: 300}}
                    progress={this.state.progress}
                />
            </View>

        )
    }

    _downloadImage(url) {

        this.setState({ progress: 0.0});

        RNFetchBlob.config({
            fileCache: true
        })
        .fetch('GET', url)
        .progress({count: 10}, (received, total) => {
            //this.setState({ progress: received / total});
        })
        .then((response) => {

            this.setState((prev) => {

                console.log(prev);

                return {
                    progress: 0.5
                }
            });
        })
    }

    _downloadMulImages() {

        let names = [
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/c1/ba/4d/c1ba4d0fb26a8a9742cb5f5d6c7cb7da.jpg'
        ];



        const length = names.length;
        this.setState({
            total: length,
            completed: 0,
            progress: 0
        })

        for (let i = 0; i < length; i++) {

            this._downloadImage(names[i]);
        }
    }
}

export default TestUIScreen;
