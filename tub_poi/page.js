const getPointsInterest = require('./index');
const getDistanceTime = require('./getDistanceTime')
const getLocation = require('./postalcodes/getLocations')

module.exports = async function render(postalcode) {
    return new Promise((resolve, reject) => {
        getPointsInterest(postalcode).then(data => {

            let array = [];
            for(let i=0; i < data.length; i++){
                let entry = {
                    name:'',
                    string:'',
                }
                if(data.station !== undefined){
                    getDistanceTime("driving-traffic",data.poi.lat + ',' + data.poi.lon +';'+ data.station.lat + ',' + data.station.lon).then(time => {
                        entry.name = data.poi.name;
                        entry.string = 'Paragem mais próxima: ' + data.station.name + '\n Tempo de viagem: ' + time.duration + '\n Distância: ' + time.distance+ '\n';
                    });
                }else{

                    getLocation(postcode).then(location => {
                        getDistanceTime("walking",data.poi.lat + ',' + data.poi.lon +';'+ location.localizacao[1] + ',' + location.localizacao[0] ).then(time => {
                            entry.name = data.poi.name;
                            entry.string = 'Não existem paragens nas proximidades. \n Distância: ' + time.distance ;
                        });
                    });
                }
                array.push(entry)
            }

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
                    <h4><b>`+array[0].name+`</b></h4>
                    <p>`+array[0].string+`<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h4><b>`+array[1].name+`</b></h4>
                    <p>`+array[1].string+`<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h4><b>`+array[2].name+`</b></h4>
                    <p>`+array[2].string+`<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h4><b>`+array[3].name+`</b></h4>
                    <p>`+array[3].string+`<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h4><b>`+array[4].name+`</b></h4>
                    <p>`+array[4].string+`<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h4><b>`+array[5].name+`</b></h4>
                    <p>`+array[5].string+`<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h4><b>`+array[6].name+`</b></h4>
                    <p>`+array[6].string+`<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h4><b>`+array[7].name+`</b></h4>
                    <p>`+array[7].string+`<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h4><b>`+array[8].name+`</b></h4>
                    <p>`+array[8].string+`<p>
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
