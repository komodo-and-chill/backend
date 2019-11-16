const getMapsInfo = require('../maps').getInfo;

module.exports = {
  'route': '/api/commute_info',
  async get({req, res, next}) {
    const { origin, destination } = req.params;
    getMapsInfo(origin, destination)
      .then(data => {
        res.json(data);
        next();
      })
      .catch(err => {
        res.json(400, { message: `Error: ${err}` })
        next();
      })
  }
}