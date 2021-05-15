const axios = require("axios");
const config = require("./config");

module.exports = function getDistanceTime(profile,coordinates) {
    const token = config.mapboxKey
    let request = `https://api.mapbox.com/directions-matrix/v1/mapbox/${profile}/${coordinates}?sources=1&annotations=distance,duration&access_token=${token}`;

    return axios.get(request).then( (response) => {
        let distance = response.data.distances[0][0];
        let duration = response.data.durations[0][0];
        return {distance: distance, duration: duration};
        });

}



