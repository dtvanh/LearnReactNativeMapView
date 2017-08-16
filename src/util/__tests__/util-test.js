import { getYTileByLat, getXTileByLng, getTileMapLinks } from '../Util';

describe('Util', () => {

    it('convert lat to y tile grid', () => {
        const expectedYTile = 56;
        expect(getYTileByLat(21.029508, 7)).toEqual(expectedYTile);
    });

    it('convert lng to x tile grid', () => {
        const expectedXTile = 101;
        expect(getXTileByLng(105.836620, 7)).toEqual(expectedXTile);
    });

    it('get all links tile map based on Lat Lng', () => {

        let expectedLinks = [

        ];

        let links = getTileMapLinks({
            boundaries: [39.741710, -92.675564, 37.366217, -86.067470],
            zoomLevel: 7
        });

        expect(expectedLinks).toEqual([]);
    })

})
