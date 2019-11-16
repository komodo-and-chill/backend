module.exports = {
  'route': '/api/register',
  post({api, req, res, next}) {
    console.log(req.params);
    return next();
  }
}