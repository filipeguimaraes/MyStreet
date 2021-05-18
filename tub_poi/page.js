const getPointsInterest = require('./index');
const getDistanceTime = require('./getDistanceTime')
const getLocation = require('./postalcodes/getLocations')

async function aux(postalcode,location) {

    return new Promise((resolve, reject) => {
        getPointsInterest(postalcode).then(data => {
            let array = [];
            let finish = 0;
            for (let i = 0; i < data.length; i++) {

                let entry = {
                    name: '',
                    string: '',
                }
                entry.name = data[i].poi.name;
                if (data[i].station) {
                    getDistanceTime("driving-traffic", data[i].poi.lon + ',' + data[i].poi.lat + ';' + data[i].station.lon + ',' + data[i].station.lat).then(time => {
                        entry.string = 'Paragem mais próxima:</p><b> ' + data[i].station.name + '</b>\n <p> Tempo de viagem: <b>' + Math.round(time.duration/60) + 'min</b></p> \n<p> Distância: <b>' + (time.distance/1000).toFixed(2) + "km</b>\n";
                        array.push(entry)
                        finish++;
                        if (finish === data.length){
                            resolve(array);
                        }
                    }).catch(e => {
                        console.log(e.message)
                        array.push(entry);
                        finish++;
                        if (finish === data.length){
                            resolve(array);
                        }
                    });
                } else {
                    getDistanceTime("walking", data[i].poi.lon + ',' + data[i].poi.lat + ';' + location.center[0] + ',' + location.center[1]).then(time => {
                        entry.string = 'Não existem paragens próximas.</p>'+'<p>Fica a <b>'+(time.distance/1000).toFixed(2)+'km </b>de onde se encontra.';
                        array.push(entry);
                        finish++;
                        if (finish === data.length){
                            resolve(array);
                        }
                    }).catch(e => {
                        console.log(e.message)
                        array.push(entry);
                        finish++;
                        if (finish === data.length){
                            resolve(array);
                        }
                    });
                }
            }
        });
    });
}


module.exports = function render(postalcode) {
    return new Promise((resolve, reject) => {
        getLocation(postalcode).then(location => {
            aux(postalcode,location).then(array => {
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
                    <h2><b>` + array[0].name + `</b></h2>
                    <p>` + array[0].string + `<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h2><b>` + array[1].name + `</b></h2>
                    <p>` + array[1].string + `<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h2><b>` + array[2].name + `</b></h2>
                    <p>` + array[2].string + `<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h2><b>` + array[3].name + `</b></h2>
                    <p>` + array[3].string + `<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h2><b>` + array[4].name + `</b></h2>
                    <p>` + array[4].string + `<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h2><b>` + array[5].name + `</b></h2>
                    <p>` + array[5].string + `<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h2><b>` + array[6].name  + `</b></h2>
                    <p>` + array[6].string + `<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h2><b>` + array[7].name + `</b></h2>
                    <p>` + array[7].string + `<p>
                </div>
            </div>
        </div>

        <div class="grid-item">
            <div class="card">
                <div class="container">
                    <h2><b>` + array[8].name + `</b></h2>
                    <p>` + array[8].string + `<p>
                </div>
            </div>
        </div>

    </div>
</body>
</div>
        `);


            });
        });

    });
}

//render('4150-644').then(console.log);
