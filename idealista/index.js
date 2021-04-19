const getID = require("./getID");
const getPropriedades = require("./getPropriedades");

let distrito = "Braga";

const freguesias = [
    "Abação e Gémeos",
    "Airão e Vermil",
    "Aldão",
    "Arosa e Castelões",
    "Atães e Rendufe",
    "Azurém",
    "Barco",
    "Briteiros (Santo Estêvão) e Donim",
    "Briteiros (São Salvador e Santa Leocádia)",
    "Brito",
    "Caldelas",
    "Candoso (São Martinho)",
    "Candoso (São Tiago) e Mascotelos",
    "Conde e Gandarela",
    "Costa",
    "Creixomil",
    "Fermentões",
    "Gonça",
    "Gondar",
    "Guardizela",
    "Infantas",
    "Leitões, Oleiros e Figueiredo",
    "Longos",
    "Lordelo",
    "Mesão Frio",
    "Moreira de Cónegos",
    "Nespereira",
    "Oliveira, São Paio e São Sebastião",
    "Pencelo",
    "Pinheiro",
    "Polvoreira",
    "Ponte",
    "Prazins (Santa Eufémia)",
    "Prazins (Santo Tirso) e Corvite",
    "Ronfe",
    "Sande (São Lourenço) e Balazar",
    "Sande (São Martinho)",
    "Sande (Vila Nova e São Clemente)",
    "São Torcato",
    "Selho (São Cristóvão)",
    "Selho (São Jorge)",
    "Selho (São Lourenço) e Gominhães",
    "Serzedelo",
    "Serzedo e Calvos",
    "Silvares",
    "Souto e Gondomar",
    "Tabuadelo e São Faustino",
    "Urgezes"
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function procuraCasaPorFreguesia(freguesia) {

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
        //console.log("Nome: " + nome + " || ID: " + id + " || ");

        getPropriedades(id, nome).then((data) => {
            console.log("Nome: " + nome + " || ID: " + id + " || Casas: " + data.total);
        })

    }).catch(erro => console.log(erro.message));
}


async function getAll() {
    for (let i = 0; i < freguesias.length; i++) {
        procuraCasaPorFreguesia(freguesias[i]);
        await delay(1000);
    }

}

getAll().then();
