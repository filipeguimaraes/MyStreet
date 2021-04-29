const getLocation = require("./getLocations");
var fs = require('fs');
const csv = require('csv-parser');

async function getLocations(postcode) {
    getLocation(postcode)
    .then(function (response) {
        if(typeof response.features[0] == 'undefined')
            throw new Error("Não foi possível pesquisar por: " + postcode);
        //console.log(response.features[0])
        console.log({freguesia: response.features[0].context[0].text, distrito: response.features[0].context[1].text})
        return {freguesia: response.features[0].context[0].text, distrito: response.features[0].context[1].text}
    })
    .catch(erro => {console.log(erro.message)
                     return {}})                  
}

//Distrito all caps
function freguesias(distrito){
    var file = []
    csv({ separator: ';' });
    fs.createReadStream('../ListaFreguesiasVigentes.csv')
    .pipe(csv())
    .on('data', (row) => {
        //file.push(row)
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
}

getLocations('4350-010')
freguesias('PORTO')