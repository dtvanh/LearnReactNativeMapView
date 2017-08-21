import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ProgressBar from './components/ProgressBar';
import realm from './db/realm';
import {getTileMapLinks} from './util/Util';

class DownloadOfflineDataScreen extends Component {

    constructor() {
        super();

        this.state = {
            progress: 0.0,
            total: 0,
            completed: 0,
            failed: 0
        }
    }

    render() {
        return (

            <View style= {{
                flex: 1.0,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View>
                    <TouchableOpacity onPress={() => {
                        //this._downloadImage(imgLink)
                        this._getAllTileMapLink();
                    }}>
                        <Text>Get Tile Map Link</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        //this._downloadImage(imgLink)
                        this._downloadMulImages();
                    }}>
                        <Text>Start Download</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        //this._downloadImage(imgLink)
                        this._clearRealmData();
                    }}>
                        <Text>Clear Data</Text>
                    </TouchableOpacity>
                </View>

                <ProgressBar
                    fillStyle={{}}
                    backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                    style={{marginTop: 10, width: 300}}
                    progress={this.state.progress}
                />
            </View>

        )
    }

    _getAllTileMapLink() {

        // 39.412512, -95.020681
        // 38.812002, -94.235999
        let pointA = {
            lat: 39.412512,
            lng: -95.020681
        }

        let pointB = {
            lat: 38.812002,
            lng: -94.235999
        }

        let links = getTileMapLinks({
            boundaries: [pointA.lat, pointB.lng, pointB.lat, pointB.lng],
            zoomRange: [7, 10]
        });

        console.log(links);
    }

    _downloadImage(url) {

        this.setState({ progress: 0.0});

        let cacheFilePath = '';

        RNFetchBlob.config({
            fileCache: true
        })
        .fetch('GET', url)
        .then((response) => {

            cacheFilePath = response.getFile
            return response.readFile('base64')
        })
        .then((base64Str) => {

            let imageData = 'data:image/png;base64,' + base64Str;

            realm.write(() => {
                realm.create('MapTile', {
                    base64String: imageData,
                    creationDate: new Date(),
                    updatedDate: new Date()});
            });

            // Update progress Bar
            this.setState((prevState) => {
                let __completed = prevState.completed + 1;

                return {
                    completed: __completed,
                    progress: __completed / prevState.total
                }
            })

            return RNFetchBlob.fs.unlink(cacheFilePath);
        })
        .catch((err) => {

            console.log(err.message);
        })
    }

    _downloadMulImages() {

        let names = [
            'https://tile.openstreetmap.org/8/148/96.png',
        ];

        const length = names.length;

        this.setState({
            total: length,
            completed: 0,
            progress: 0,
            failed: 0
        });

        for (let i = 0; i < length; i++) {

            this._downloadImage(names[i]);
        }
    }

    // ACTIONS

    _clearRealmData() {
        realm.write(() => {
            let mapTile = realm.objects('MapTile');
            realm.delete(mapTile);
        });
    }
}

export default DownloadOfflineDataScreen;
