const queryOverpass = require('@derhuerst/query-overpass')

module.exports = function getRoutes(city) {

    return queryOverpass(`
        [out:json][timeout:25];
        (area["name"=${city}];
        relation["type"="route"]["route"="bus"](area););
        out body;
        >;
        out skel qt;`);

}

//getRoute("Porto").then((data) => console.log(data)).catch(console.log);

