const csv = require('csv-parser');
const fs = require('fs');


function readStops() {
    fs.createReadStream('./resources/gtfs/stops.txt')
        .pipe(csv())
        .on('data', (row) => {
            console.log(row);
        });
}
