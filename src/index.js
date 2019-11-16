// Test to check restify is working:

const restify = require('restify');
const Server = require('./server');

const server = restify.createServer({
  name: 'komodo-and-chill',
  version: '1.0.0'
});

const routes = [
  'test'
];

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

for (const routeFileName of routes) {
  const route = require(`./routes/${routeFileName}`);
  for (const verb of ['get', 'put', 'post', 'del']) {
    if (route.hasOwnProperty(verb)) {
      console.log(`Adding route "${verb} ${route.route}"`);
      server[verb](route.route, route[verb]);
    }
  }
}

const test = new Server();

server.get('/api/echo/:name', (req, res, next) => {
  res.send("Hello your name is " + req.params.name);
  return next();
});

server.listen(8080, () => {
  console.log(server.name, "listening at", server.url)
});