'use strict';

import Realm from 'realm';

class MapTile extends Realm.Object {}
MapTile.schema = {
    name: 'MapTile',
    properties: {
        zoomLevel: {type: 'int', default: 0},
        rowIndex: {type: 'int', default: 0},
        columnIndex: {type: 'int', default: 0},
        link: {type: 'string', default: ''},
        base64String: {type: 'string', default: ''},
        creationDate: {type: 'date', default: null},
        updatedDate: {type: 'date', default: null}
    },
};

class Points extends Realm.Object {}
Points.schema = {
    name: 'Points',
    properties: {
        lat: {type: 'double', default: 0},
        lng: {type: 'double', default: 0},
    },
};

export default new Realm({schema: [ MapTile, Points ]});