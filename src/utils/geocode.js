const request = require("request");

const getGeocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1Ijoic291cmF2cmFuZSIsImEiOiJja3ludnBsb2ExZjA0MnV1ZmJsODdqczliIn0.TvL0Xu_fU0VuP5v9E4KYcQ`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to find location.", undefined);
        } else {
            const feature = response.body.features[0];
            const data = {
                lat: feature.center[0],
                lon: feature.center[1],
                location: feature.place_name,
            };
            callback(undefined, data);
        }
    });
};

module.exports = getGeocode;
