const getID = require("./getID");
const getPropriedades = require("./getPropriedades");
const fs = require('fs');

module.exports = function procuraCasaPorFreguesia(freguesia, distrito) {
    let dir1 = "cache/" + distrito;
    let dir = "cache/" + distrito + "/" + freguesia;

    if (!fs.existsSync(dir1)) {
        fs.mkdirSync(dir1);
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

        getID(freguesia).then(function (response) {
            if (!response.locations[0]) throw new Error("Não foi possível pesquisar por: " + freguesia);

            let i = 0;
            while (true) {
                if (String(response.locations[i].name).includes(distrito) && response.locations[i].locationId)
                    break;
                else if (response.locations[i + 1]) {
                    i++;
                } else {
                    throw new Error("Não possui localização na api: " + freguesia);
                }
            }

            const nome = response.locations[i].name;
            const id = response.locations[i].locationId;

            getPropriedades(id, nome).then((data) => {
                let dados = JSON.stringify(data);
                fs.writeFileSync(dir + '/proprieties.json', dados);
                console.log("Nome: " + nome + " || ID: " + id + " || Casas: " + data.total);
            })
        }).catch(erro => console.log(erro.message));
    }

    return JSON.parse(fs.readFileSync(dir + '/proprieties.json', 'utf-8'));
}
