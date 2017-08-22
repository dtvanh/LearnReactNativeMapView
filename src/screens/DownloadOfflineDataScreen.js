import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ProgressBar from '../components/ProgressBar';
import realm from '../db/realm';
import { getTileMapLinks } from '../util/Util';

const initState = {
    progress: 0.0,
    total: 0,
    completed: 0,
    failed: 0
}

class DownloadOfflineDataScreen extends Component {

    constructor() {
        super();

        this.state = {
            ...initState
        }

        this._getAllTileMapLink.bind(this);
    }

    render() {
        return (

            <View style= {styles.container}>
                <View>
                    <TouchableOpacity onPress={() => {
                        let path = realm.path;
                    }}>
                        <Text>Get Tile Map Link</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._tapOnStartDownload()}>
                        <Text>Start Download</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        this._tapOnClearData();
                    }}>
                        <Text>Clear Data</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>{this.state.completed} / {this.state.total}</Text>
                    <ProgressBar
                        fillStyle={{}}
                        backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                        style={{marginTop: 10, width: 300}}
                        progress={this.state.progress}
                    />
                </View>
            </View>
        )
    }

    // ***************** ACTIONS *****************
    _tapOnClearData() {
        this._clearRealmData();
    }

    _tapOnStartDownload() {

        if (this.state.total !== this.state.completed + this.state.failed) {
            return;
        }

        this.setState({ progress: 0.0});
        
        let pointNW = {
            lat: -27.417269,
            lng: 152.950765

        };

        let pointSE = {
            lat: -27.515184,
            lng: 153.093624
        };

        let tileMapInfos = this._getAllTileMapLink(
            pointNW,
            pointSE,
            [3,15]
        );

        this._downloadMulImages(tileMapInfos);
    }

    // ***************** UI HELPER *****************


    // ***************** HELPER *****************
    _getAllTileMapLink(pointNW, pointSE, zoomRange) {

        let links = getTileMapLinks({
            boundaries: [pointNW.lat, pointNW.lng, pointSE.lat, pointSE.lng],
            zoomRange: zoomRange
        });

        return links;
    }

    _downloadImage(info) {

        let cacheFilePath = '';

        RNFetchBlob.config({
            fileCache: true
        })
        .fetch('GET', info.link)
        .then((response) => {

            cacheFilePath = response.getFile
            return response.readFile('base64')
        })
        .then((base64Str) => {

            let imageData = 'data:image/png;base64,' + base64Str;

            realm.write(() => {
                realm.create('MapTile', {
                    ...info,
                    base64String: imageData,
                    creationDate: new Date(),
                    updatedDate: new Date()});
            });

            // Update progress Bar
            this.setState((prevState) => {
                let __completed = prevState.completed + 1;

                return {
                    completed: __completed,
                    progress: __completed / prevState.total,
                }
            })

            return RNFetchBlob.fs.unlink(cacheFilePath);
        })
        .catch((err) => {

            console.log(err.message);
            this.setState({
                failed: this.state.failed + 1
            })
        })
    }

    _downloadMulImages(links: Array) {

        const length = links.length;

        this.setState({
            total: length,
            completed: 0,
            progress: 0,
            failed: 0
        });

        for (let i = 0; i < length; i++) {

            this._downloadImage(links[i]);
        }
    }

    _clearRealmData() {

        realm.write(() => {
            let mapTile = realm.objects('MapTile');
            realm.delete(mapTile);
        });

        this.setState({
            progress: 0.0,
            total: 0,
            completed: 0,
            failed: 0
        });
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1.0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default DownloadOfflineDataScreen;
