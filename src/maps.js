const config = require('../config/config');
const client = require('@google/maps').createClient({
  key: config.google_api_key,
  Promise
});

exports.getInfo = async function getInfo(origin, destination) {
  const promises = ['walking', 'driving', 'transit'].map(mode => getInfoForMode(origin, destination, mode));
  const [walking, driving, transit] = await Promise.all(promises);
  return { walking, driving, transit };
}

async function getInfoForMode(origin, destination, mode) {
  const { json } = await client.distanceMatrix({
    origins: [origin],
    destinations: [destination],
    mode,
  }).asPromise();
  const data = json.rows[0].elements[0];
  return {
    distance: data.distance.text,
    duration: data.duration.text,
  };
}
