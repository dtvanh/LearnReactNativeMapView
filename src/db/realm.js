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

class Features extends Realm.Object {}
Features.schema = {
    name: 'Features',
    properties: {
        type: {type: 'string', default: ''},
        data: {type: 'string', default: ''},
        description: {type: 'string', default: ''}
    },
};

export default new Realm({schema: [ MapTile, Features]});