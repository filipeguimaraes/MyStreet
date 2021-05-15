const queryOverpass = require('@derhuerst/query-overpass')

module.exports = function getStations(city){

    return queryOverpass(`
        [out:json][timeout:25];
        (area["name"=${city}];
        node["public_transport"="platform"]["bus"="yes"](area););
        out body;
        >;
        out skel qt;`);

}