// Test to check restify is working:

const restify = require('restify');

const server = restify.createServer({
  name: 'komodo-and-chill',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/api/echo/:name', (req, res, next) => {
  res.send("Hello your name is " + req.params.name);
  return next();
});

server.listen(8080, () => {
  console.log(server.name, "listening at", server.url)
});