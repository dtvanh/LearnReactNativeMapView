import { getYTileByLat, getXTileByLng } from '../Util';

describe('Util', () => {

    it('convert lat to x tile grid', () => {
        const expectedXTile = 101;
        expect(getXTileByLat(21.029508, 7)).toEqual(expectedXTile);
    });

    it('convert lng to y tile grid', () => {
        const expectedYTile = 56;
        expect(getYTileByLng(105.836620, 7)).toEqual(expectedYTile);
    });
})
