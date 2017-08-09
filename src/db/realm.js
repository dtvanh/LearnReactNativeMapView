'use strict';

import Realm from 'realm';

class MapTile extends Realm.Object {}
MapTile.schema = {
    name: 'MapTile',
    properties: {
        zoomLevel: {type: 'int', default: 0},
        row: {type: 'int', default: 0},
        column: {type: 'int', default: 0},
        url: {type: 'string', default: ''},
        localPath: {type: 'string', default: ''},
        creationDate: 'date'
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
