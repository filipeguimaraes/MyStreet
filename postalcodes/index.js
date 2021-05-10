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
    fs.createReadStream('../ListaFreguesias.csv')
    .pipe(csv())
    .on('data', (row) => {
        if(row["Descritivo Distrito"].includes(distrito)){
            console.log(row["Descritivo abreviado da Freguesia"])
            file.push(row["Descritivo abreviado da Freguesia"])
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed')
    });

    console.log(file)
    return file
}

getLocations('4350-010').then();
//freguesias('PORTO')