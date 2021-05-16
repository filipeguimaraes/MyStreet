if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

module.exports = function getDist(location, stationLat, stationLon) {
    let decimals = 2;
    let earthRadius = 6371; // km
    let lat1 = parseFloat(location[0]);
    let lat2 = parseFloat(stationLat);
    let lon1 = parseFloat(location[1]);
    let lon2 = parseFloat(stationLon);

    let dLat = (lat2 - lat1).toRad();
    let dLon = (lon2 - lon1).toRad();
    lat1 = lat1.toRad();
    lat2 = lat2.toRad();

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = earthRadius * c;

    //return distance
    return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

