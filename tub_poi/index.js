const getRoutes = require("./getRoutes");
const getStations = require("./getStations");
const fs = require('fs');
const city = 'Porto'

/*
    Method that retrieves information from the Overpass API and stores it in the cache directory.
    Checks if the directory of a city already exists, if not, it fetches de data and creates the new directory.
 */
function getsData(city){

    let dir = "cache/" + city;

    //If the directory for that city does not exist.
    if (!fs.existsSync(dir)) {
        //create directory
        fs.mkdirSync(dir);

        //Get route and write to ./city/route.json file
        getRoutes(city).then((data) => {
            let dadosR = JSON.stringify(data);
            fs.writeFileSync(dir+'/routes.json', dadosR);
        }).catch(console.log)

        //Get stations and write to ./city/stations.json file
        getStations(city).then((data) => {
            let dadosS = JSON.stringify(data);
            fs.writeFileSync(dir+'/stations.json', dadosS);
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
function writeStations() {
    let objData = '';
//cache/Land/Land.json
    fs.readFile('cache/Porto/stations.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            // parse string JSON into a javascript object
            objData = JSON.parse(jsonString)

            fs.appendFileSync('cache/Porto/stationsFinal.json', '[');

            for (const elem in objData) {

                const dados = {
                     id: objData[elem].id,
                     lat: objData[elem].lat,
                     lon: objData[elem].lon,
                     name: objData[elem].tags.name}
                console.log(dados)

                // parsing a javascript to a JSON string
                let dadosS = JSON.stringify(dados);
                fs.appendFileSync('cache/Land/stationsFinal.json', dadosS);

                //ERROR
                fs.appendFileSync('cache/Land/stationsFinal.json', ',');
            }
            fs.appendFileSync('cache/Land/stationsFinal.json', ']');

        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
}

/*
    From the stations defined on the finalStations.json file, build a file with all
    the corresponding routes.
 */

function getRelations(){

    let objDataStation;
    let objDataRoute;
    let dic = new Map()
    let idRoutes=[]
    let counter=0;
    let counterS=0;
    let idR;
    let idStation

    // Get the stations
    fs.readFile('cache/Porto/stationsFinal.json', 'utf8', (err, jsonStringStation) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            objDataStation = JSON.parse(jsonStringStation)
            // Get the routes
            fs.readFile('cache/Porto/routes.json', 'utf8', (err, jsonStringRoute) => {
                if (err) {
                    console.log("Error reading file from disk:", err)
                    return
                }
                try {
                    for(const station in objDataStation) {
                        idStation = objDataStation[station].id
                        counterS = counterS + 1;
                        objDataRoute = JSON.parse(jsonStringRoute)
                        for (let object in objDataRoute) {
                            if (objDataRoute[object].type == 'relation') {
                                idR = objDataRoute[object].id
                                counter = counter + 1;
                                let members = objDataRoute[object].members
                                for (let m in members) {
                                    if (members[m].type == 'node' && members[m].ref == idStation){
                                        idRoutes.push(idR)
                                    }
                                }
                            }
                        }

                        let uniqueIds = [...new Set(idRoutes)];

                        // Dictionary to store the key:station, value:list of id routes pair
                        //dic.set(idStation,uniqueIds)
                        //console.log(uniqueIds)
                        console.log('Escrever entry ...')
                        const entry = {
                            station: idStation,
                            relations: uniqueIds}
                        let data = JSON.stringify(entry);
                        fs.appendFileSync('cache/Porto/Dicionario.json', data);
                        console.log('Finished')
                    }
                    //console.log('Num stations:' + counterS)
                    //console.log('Num relations:' + counter)
                } catch (err) {
                    console.log('Error parsing JSON string:', err)
                }
            })
        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
/*
    try{
        for (let [key, value] of dic) {
            const entry = {
                station: key,
                relations: value}
            let data = JSON.stringify(entry);
            fs.appendFileSync('cache/Porto/Dicionario.json', data);

            console.log('Escrevendo ...')
        }

    } catch (err) {
        console.log('Error parsing JSON string:', err)
    }*/

}

//getsData('Porto')
//writeStations()
getRelations()





//
/*
    //para cada estação, retirar os dados principais e escrever no ficheiro

    for(var elem in objData.elements){
         //console.log(elem)
         const dados = {
             id: elem.id
             lat: elem.lat
             lon: elem.lon
             name: elem.tags.name
          -> relations: [ {idX, nome da relação (trajeto)} ... ]
         }
         let station = JSON.stringify(dados);
         fs.writeFileSync('cache/' + city +'/finalStations.json', station);

    // rotas

   //iterar sobre os elementos -> relations
           idIterationAtual = para saber onde guardar ?
        //iterar sobre os membros da relation

            para cada valor ref,

         */

//console.log(JSON.parse(fs.readFileSync('cache/Porto/stations.json', 'utf-8')))

/*
try {
                    objDataRoute = JSON.parse(jsonStringRoute)
                    // Go through every station and keep its id
                    for(const station in objDataStation){
                        const idStation = objDataStation[station].id
                        // Go through every relation
                        for(const eachRelation in objDataRoute){
                            const idR = objDataRoute[eachRelation].id
                            let members = objDataRoute[eachRelation].members
                            // For every member in the relation
                            for(const m in members){
                                if(members[m].type=='node' && members[m].ref == idStation){
                                    console.log('Found match: node with num ' + members[m].ref )
                                    idRoutes.push(idR)
                                }
                            }
                        }
 */