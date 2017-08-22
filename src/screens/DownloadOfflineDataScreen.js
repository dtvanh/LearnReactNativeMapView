import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet,
    TextInput
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ProgressBar from '../components/ProgressBar';
import realm from '../db/realm';
import { getTileMapLinks } from '../util/Util';

const initState = {
    progress: 0.0,
    total: 0,
    completed: 0,
    boundaries: '-27.417269,152.950765,-27.515184,153.093624',
    zoomRange: '3-15',
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

    // ***************** ACTIONS *****************
    _tapOnClearData() {
        this._clearRealmData();
    }

    _tapOnStartDownload() {

        if (this.state.total !== this.state.completed + this.state.failed) {
            return;
        }

        this.setState({ progress: 0.0});

        let bounds = this.state.boundaries.split(',');
        let zoomRange = this.state.zoomRange.split('-');

        
        let pointNW = {
            lat: parseFloat(bounds[0]),
            lng: parseFloat(bounds[1])
        };

        let pointSE = {
            lat: parseFloat(bounds[2]),
            lng: parseFloat(bounds[3])
        };

        

        let tileMapInfos = this._getAllTileMapLink(
            pointNW,
            pointSE,
            [parseInt(zoomRange[0]),parseInt(zoomRange[1])]
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

    _downloadMulImages(links) {

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

    render() {
        
            const { container, btnGroup, progressBar, boundInfo } = styles;
            
            return (
    
                <View style= { container }>
                    <View style= {boundInfo}>
                        
                        <View style={{
                            
                        }}>
                            <Text>Boundaries (NW, SE)</Text>    
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 10}}
                                onChangeText={(text) => this.setState({boundaries: text})}
                                value={this.state.boundaries}
                            />
                        </View>
                        
                        <View style={{
                            marginTop: 10
                        }}>
                            <Text>Zoom Range:(3-15)</Text>    
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 10}}
                                onChangeText={(text) => this.setState({zoomRange: text})}                                
                                value={this.state.zoomRange}
                            />
                        </View>

                        <View style={{
                            marginTop: 10
                        }}>
                            <Text>Realm Path (For Debug):</Text>    
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 10}}
                                editable = {false}
                                value={this.state.path}
                                multiline = {true}
                                numberOfLines = {45}
                            />
                        </View>

                    </View>

                    <View style={ btnGroup }>
                        <TouchableOpacity onPress={() => {
                            console.log(realm.path);
                            this.setState({path: realm.path})
                        }}>
                            <Text>Get Local Realm Path</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity onPress={() => this._tapOnStartDownload()}>
                            <Text>Start Download</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity onPress={() => {
                            this._tapOnClearData();
                        }}>
                            <Text>Clear All Data</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={ progressBar }>
                        <Text style={{
                            fontSize: 12,
                            color: 'gray'
                        }}>{this.state.completed} / {this.state.total}</Text>
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
}

const styles = StyleSheet.create({

    container: {
        flex: 1.0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnGroup: {
        flex: 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'green'
    },

    progressBar: {
        flex: 0.1
    },
    
    boundInfo: {
        flex: 0.8,
        flexDirection: 'column',
        width: 300
    },
})

export default DownloadOfflineDataScreen;
