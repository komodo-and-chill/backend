module.exports = {
  'route': '/api/test',
  get(req, res, next) {
    res.json({
      message: 'Hello this is a test!'
    });
    return next();
  }
}