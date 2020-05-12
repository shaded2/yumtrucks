const express = require('express');
const axios = require('axios');
const bodyParser= require('body-parser');
const app = express();
const http = require('http').Server(app);
const NodeGeocoder = require('node-geocoder');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const options = {
    provider: 'google',
    apiKey: 'AIzaSyAhmBwpYlcuwFSM0rBjqePlo3xTapQUSro', //should be in env variable for security
};
const geocoder = NodeGeocoder(options);

//initial location
const lat = 37.7929789;
const long = -122.4212424;

async function get_locations(lat, long){
    try{
        url = "https://data.sfgov.org/resource/rqzj-sfat.json?$order=distance_in_meters(location, 'POINT ("+long+" "+lat+")')&$limit=5&status=APPROVED";
        console.log(url)
        let res = await axios.get(url) 
        return res.data
    }catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
}
    
app.get('/locations', async (req, res)=>{
    let locations = await get_locations(lat, long)
    res.send(locations)
})

app.get('/locations/:zip', async (req, res)=>{
    try{
        let geo_loc = await geocoder.geocode(req.params.zip);
        let locations = await get_locations(geo_loc[0].latitude, geo_loc[0].longitude)
        res.send(locations);
    }catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
})

app.post('/locations', async (req, res) =>{
    try{
        let geo_loc = await geocoder.geocode(req.body.loc);
        let locations = await get_locations(geo_loc[0].latitude, geo_loc[0].longitude)
        res.send(locations);
    }catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
})

var server = http.listen(3030, () =>{
    console.log('server is listening on port' , server.address().port);
})
