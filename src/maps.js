const config = require('../config/config');
const googleMapsCLient = require('@google/maps').createClient({
    key: config.google_api_key
});

async function getDirections(origin, destination) {
    // return the direction response for travel between [origin] and [destination] by transit

    let response = await googleMapsCLient.directions({
        origin: origin,
        destination: destination,
        units: 'metric',
        mode: 'transit'
    });
    
    if(response.json.status == 'OK') {
        let responseJson = response.json;
        let costs = responseJson.routes.map((route) => {
            // TODO make a better cost function
            route.legs.map((leg) => leg.distance.value).reduce((acc, dist) => acc + dist);
        });
        let minCost = Math.min(costs);
        let indexOfBest = costs.indexOf(minCost);
        let bestRoute = responseJson.routes[indexOfBest];
        return bestRoute;
    } else {
        return null;
    }
}