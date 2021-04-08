const getID = require("./getID");
const getPropriedades = require("./getPropriedades");


const freguesias = [
    'Adaúfe',
    'Arentim e Cunha',
    'Maximinos, Sé e Cividade',
    'São José de São Lázaro e São João do Souto',
    'São Vicente',
    "São Víctor",
    "São Julião (Cabreiros e Passos)",
    "Celeirós, Aveleda e Vimieiro",
    "Crespos e Pousada",
    "Santo Estêvão e São Vicente",
    "Espinho",
    "Esporões",
    "São Pedro e São Mamede",
    "Ferreiros e Gondizalves",
    "Figueiredo",
    "Gualtar",
    "São Pedro (Guisande e Oliveira)",
    "Lamas",
    "Lomar e Arcos",
    "Merelim (São Paio), Panóias e Parada de Tibães",
    "Merelim (São Pedro) e Frossos",
    "Mire de Tibães",
    "Morreira e Trandeiras",
    "Nogueira, Fraião e Lamaçães",
    "Nogueiró e Tenões",
    "Padim da Graça",
    "Palmeira",
    "Pedralva",
    "Priscos",
    "Real, Dume e Semelhe",
    "Ruilhe",
    "Santa Lucrécia de Algeriz e Navarra",
    "Sequeira",
    "Sobreposta",
    "Tadim",
    "Tebosa",
    "Vilaça e Fradelos"
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function procuraCasaPorFreguesia(freguesia) {

    getID(freguesia).then(function (response) {
        if (!response.locations[0]) throw new Error("Não foi possível pesquisar por: " + freguesia);
        let i = 0;
        while (true) {
            if (String(response.locations[i].name).includes("Braga") && response.locations[i].locationId)
                break;
            else if (response.locations[i + 1]) {
                i++;
            } else {
                throw new Error("Não possui localização na api: " + freguesia);
            }
        }

        const nome = response.locations[i].name;
        const id = response.locations[i].locationId;
        //console.log("Nome: " + nome + " || ID: " + id + " || ");

        getPropriedades(id, nome).then((data) => {
            console.log("Nome: " + nome + " || ID: " + id + " || Casas: " + data.total);
        })
    }).catch(erro => console.log(erro.message));
}

async function getAll() {
    for (let i = 0; i < freguesias.length; i++) {
        procuraCasaPorFreguesia(freguesias[i]);
        if (i % 5) {
            await delay(1000);
        }
    }

}

getAll().then();
