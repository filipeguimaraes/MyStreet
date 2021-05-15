const getLocation = require("./getLocations");
const fs = require('fs');
const csv = require('csv-parser');

async function getLocations(postcode) {
    return getLocation(postcode)
        .then(function (response) {
            if (typeof response == 'undefined')
                throw new Error("Não foi possível pesquisar por: " + postcode);
            return {
                localizacao: response.center,
                freguesia: response.context[0].text,
                distrito: response.context[1].text
            };
        })
        .catch(console.log);
}

//Distrito all caps
async function freguesias(distrito) {
    return new Promise((resolve, reject) => {
        const file = [];
        csv({separator: ';'});
        return fs.createReadStream('ListaFreguesias.csv')
            .pipe(csv())
            .on('data', (row) => {
                if (row["Descritivo Concelho"].replace(/\s+/g, '').toString() ===
                    distrito.replace(/\s+/g, '').toString().toLocaleUpperCase()) {
                    file.push(row["Descritivo abreviado da Freguesia"].toLocaleLowerCase().trim())
                }
            })
            .on('end', () => {
                resolve(file);
            });
    });
}

module.exports = async function getLocal(postcode) {
    return new Promise((resolve, reject) => {
        let params = {
            distrito: "",
            freguesias: [],
            freguesia: "",
            localizacao: []
        }
        getLocations(postcode).then(fregdist => {
            params.distrito = fregdist.distrito;
            params.freguesia = fregdist.freguesia;
            params.localizacao = fregdist.localizacao;
            freguesias(fregdist.distrito).then(fregs => {
                params.freguesias = fregs;
                for (let i = 0; i < fregs.length; i++){
                    if (fregs[i].includes(params.freguesia.toLocaleLowerCase())){
                        params.freguesia = fregs[i];
                        break;
                    }
                }
                resolve(params);
            });
        });
    });

}