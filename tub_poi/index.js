const getRoutes = require("./getRoutes");
const getStations = require("./getStations");
const getDistance = require("./getClosest");
const getLocation = require("./postalcodes/index")
const fs = require('fs');
const city = 'Porto'

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
                    if(objData[elem].tags.hasOwnProperty('name')){
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

function getPOIFile(city, list){
   return new Promise((resolve, reject) => {

       let poisList;

       let dir = "cache/" + city + "/pois.json";
       if (fs.existsSync(dir)) {
           fs.readFile(dir, 'utf8' , (err, poisString) => {
               if (err) {
                   console.error(err)
                   return;
               }
               poisList = JSON.parse(poisString);
               resolve(poisList);
           })
       }else {
           //sort list by length
           poisList = list.sort((a, b) => {
               return b.relations.length - a.relations.length;
           });

           let pointsOfInterest = JSON.stringify(poisList.slice(0,9));
           fs.writeFileSync(dir, pointsOfInterest);
           resolve(poisList);
       }
   })
}


//let porto = '4000-291'
//let porto2= '4200-319'
module.exports = function getPOI(postcode){

    return new Promise(resolve => {
        getLocation(postcode).then(location => {

            getRelations(location.localizacao).then(array => {

                //Get all by distance
                let filteredDist = array.sort((a, b) => {
                    return a.dist - b.dist;
                }).filter(function(x) {
                    return x.relations.length !== 0
                }).slice(0,20);

                getPOIFile(location.distrito, filteredDist).then( poisList => {
                    let result = [];
                    for(let i =0; i < poisList.length; i++){
                        let entry = { poi: poisList[i], station: undefined};
                        for(let j =0; j < filteredDist.length; j++){
                            const filteredArray = poisList[i].relations.filter(value => filteredDist[j].relations.includes(value));
                            if(filteredArray.length !== 0){
                                entry.station = filteredDist[j];
                                break;
                            }
                        }
                        result.push(entry);
                    }
                    resolve(result);
                });
            });
        })
    });
}





