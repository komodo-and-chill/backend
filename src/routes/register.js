module.exports = {
  'route': '/api/register',
  post({api, req, res, next}) {
    res.json({
      message: 'Hello this is a test!'
    });
    return next();
  }
}