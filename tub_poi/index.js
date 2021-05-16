const getRoutes = require("./getRoutes");
const getStations = require("./getStations");
const fs = require('fs');
const city = 'Porto'
const getDistance = require("./getClosest");

/*
    Method that retrieves information from the Overpass API and stores it in the cache directory.
    Checks if the directory of a city already exists, if not, it fetches de data and creates the new directory.
 */
function getsData(city) {

    let dir = "cache/" + city;

    //If the directory for that city does not exist.
    if (!fs.existsSync(dir)) {
        //create directory
        fs.mkdirSync(dir);

        //Get route and write to ./city/route.json file
        getRoutes(city).then((data) => {
            let dadosR = JSON.stringify(data);
            fs.writeFileSync(dir + '/routes.json', dadosR);
        }).catch(console.log)

        //Get stations and write to ./city/stations.json file
        getStations(city).then((data) => {
            let dadosS = JSON.stringify(data);
            fs.writeFileSync(dir + '/stations.json', dadosS);
        }).catch(console.log)
    }

}

/*
    Argument: city
    Method that reads through the stations file and retrieves all the essential information
    about the station and writes it into a new file.
    ATTENTION ERROR: Ao escrever o ficheiro vai ser acrescentada um virgula a mais no final.
                     Arranjar isso depois.
 */
async function finalStations() {
    return new Promise((resolve, reject) => {
        fs.readFile('cache/Porto/stations.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error open File");
            }
            try {
                // parse string JSON into a javascript object
                let objData = JSON.parse(jsonString)

                let result = [];
                for (const elem in objData) {
                    if( objData[elem].tags.name !== ''){
                        let dados = {
                            id: objData[elem].id,
                            lat: objData[elem].lat,
                            lon: objData[elem].lon,
                            name: objData[elem].tags.name,
                            dist: undefined,
                            relations: []
                        }

                        result.push(dados);
                    }
                }

                let seen = {};
                let out = [];
                let len = result.length;
                let j = 0;
                for(let i = 0; i < len; i++) {
                    let item = result[i];
                    if(seen[item.name] !== 1) {
                        seen[item.name] = 1;
                        out[j++] = item;
                    }
                }
                 resolve(out);

            } catch (err) {
                console.log('Error parsing JSON string:', err)
            }
        });
    });
}

/*
    From the stations defined on the finalStations.json file, build a file with all
    the corresponding routes.
 */

async function getRelations(location) {
    return new Promise((resolve, reject) => {
        finalStations().then(stations => {
            fs.readFile('cache/Porto/routes.json', 'utf8',
                (err, jsonStringRoute) => {
                    if (err) {
                        console.log("Error reading file from disk:", err)
                        return;
                    }
                    try {
                        let objDataRoute = JSON.parse(jsonStringRoute);
                        for (const i in stations) {
                            stations[i].dist = getDistance(location, stations[i].lat, stations[i].lon)
                            let idStation = stations[i].id;
                            for (let j in objDataRoute) {
                                if (objDataRoute[j].type === 'relation') {
                                    let idRelation = objDataRoute[j].id;
                                    let members = objDataRoute[j].members;
                                    for (let m in members) {
                                        if (members[m].type === "node"
                                            && members[m].ref === idStation) {
                                            stations[i].relations.push(idRelation);
                                        }
                                    }
                                }
                            }
                        }
                        resolve(stations);
                    } catch (err) {
                        console.log('Error parsing JSON string:', err)
                    }
                });
        });
    });
}


getRelations([41.60010974004648, -8.394646615883023]).then(array => {
    array.sort((a, b) => {
        return b.relations.length - a.relations.length;
    });
    console.log(array.slice(0, 10));
});




