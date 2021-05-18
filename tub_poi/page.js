const getMetricas = require('./index');

module.exports = async function render(postalcode) {
    return new Promise((resolve, reject) => {
        getMetricas(postalcode).then(data => {

        const local = Number.isNaN(data.mediaLocal) ? "Sem dados 😔" : data.mediaLocal.toString+'€';
            resolve(`
        <div>
        <head>
            <style>
                .grid-container {
                    display: grid;
                    grid-template-columns: auto auto auto;
                    padding: 10px;
                }
    
                .grid-container2 {
                    padding: 0px;
                }
    
                .grid-item {
                    padding: 10px;
                    font-size: 20px;
                    text-align: center;
                }
    
                .card {
                    margin: auto;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    transition: 0.3s;
                    width: 90%;
                    border-radius: 5px;
                }
    
                .card:hover {
                    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
                }
    
                .container {
                    padding: 2px 16px;
                }
    
            </style>
        </head>    
        <body>
    
            <div class="grid-container" style='font-family: "Lucida Console", "Courier New", monospace'>
    
                <div class="grid-item">
                    <div class="card">
                        <div class="container">
                            <h4><b>`+ data.mediaConcelho + `€</b></h4>
                            <p>Preço médio no concelho.</p>
                        </div>
                    </div>
                </div>
    
                <div class="grid-item">
                    <div class="card">
                        <div class="container">
                            <h4><b>`+ data.mediaFreguesia + `€</b></h4>
                            <p>Preço médio na freguesia.</p>
                        </div>
                    </div>
                </div>
    
                <div class="grid-item">
                    <div class="card">
                        <div class="container">
                            <h4><b>`+ local + `</b></h4>
                            <p>Preço médio local.</p>
                        </div>
                    </div>
                </div>
    
                <div class="grid-item">
                    <div class="card">
                        <div class="container">
                            <h4><b>`+ data.numeroQuartos + `</b></h4>
                            <p>Numero médio de quartos na zona.</p>
                        </div>
                    </div>
                </div>
    
                <div class="grid-item">
                    <div class="card">
                        <div class="container">
                            <h4><b>`+ data.tamanhoMedio + `m²</b></h4>
                            <p>Tamanho médio.</p>
                        </div>
                    </div>
                </div>
    
                <div class="grid-item">
                    <div class="card">
                        <div class="container">
                            <p><b>`+ data.range[0] + `€ - ` + data.range[1] + `€</b></p>
                            <p>Variação do preço de casas.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid-container2" style='font-family: "Lucida Console", "Courier New", monospace'>
                <div class="grid-item">
                    <div class="card">
                        <div class="container">
                            <p>Esta é a <b>`+ data.rank + `ª</b> freguesia mais barata de <b>` + data.auxRank + `</b> freguesias.</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </div>
        `);
        });
    });
}

//render('4150-644').then(console.log);
