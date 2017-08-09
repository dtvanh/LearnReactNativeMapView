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

export default new Realm({schema: [ MapTile ]});
