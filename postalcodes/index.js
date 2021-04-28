const getLocation = require("./getLocations");
var fs = require('fs');

async function getLocations(postcode) {
    getLocation(postcode)
    .then(function (response) {
        console.log(response.features[0])
        fs.appendFile('postcodes.txt', `${response.features[0].context[0].text}\n`, function (err) {
            if (err)
                console.log('Error while writing in file postcodes.txt:')
            else
                console.log(`${response.features[0].place_name}\n`)
        })
    })
    .catch(erro => console.log(erro.message))                  
}

function getAll(){
    // Guimaraes tudo = 4800-000 -> 4839-019
    // Guimaraes cidade = 4800-001 -> 4800-404
    var fi = 4800
    var si = 1
    var p

    while(fi <= 4839){
        si = 0
        if(fi == 4839){
            while(si <= 19){
                if(si < 10){
                    p = `${fi}-00${si}`
                    getLocations(p)
                } else if(si < 100){
                    p = `${fi}-0${si}`
                    getLocations(p)
                } else{
                    p = `${fi}-${si}`
                    getLocations(p)
                }
                si++
            }
        }
        while(si <= 999){
            if(si < 10){
                p = `${fi}-00${si}`
                getLocations(p)
            } else if(si < 100){
                p = `${fi}-0${si}`
                getLocations(p)
            } else{
                p = `${fi}-${si}`
                getLocations(p)
            }
            si++;
        }
        fi++;
    }

    /*
    while(si <= 404){
        if(si < 10){
            p = `${fi}-00${si}`
            getLocations(p)
        } else if(si < 100){
            p = `${fi}-0${si}`
            getLocations(p)
        } else{
            p = `${fi}-${si}`
            getLocations(p)
        }
        si++;
    }*/

}

//getAll()
getLocations('4350-334')