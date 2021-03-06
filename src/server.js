const sqlite = require('sqlite3').verbose();
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const ROUTES = [
  'test',
  'register',
  'login',
  'activities',
  'commute'
];

module.exports = class Server {
  constructor(config) {
    this.db = null;
    this.api = null;
    this.setupAPI();
    this.setupDB();
  }

  setupAPI() {
    console.log('Setting up API');
    const api = this.api = restify.createServer({
      name: 'komodo-and-chill',
      version: '1.0.0'
    });

    const cors = corsMiddleware({
      preflightMaxAge: 5,
      origins: ['*'],
      allowHeaders:['X-App-Version'],
      exposeHeaders:[]
    });

    api.pre(cors.preflight);
    api.use(cors.actual);
    api.use(restify.plugins.acceptParser(api.acceptable));
    api.use(restify.plugins.queryParser({ mapParams: true }));
    api.use(restify.plugins.bodyParser({ mapParams: true }));

    for (const routeFileName of ROUTES) {
      const route = require(`./routes/${routeFileName}`);
      for (const verb of ['get', 'put', 'post', 'del']) {
        if (route.hasOwnProperty(verb)) {
          console.log(`Adding route "${verb} ${route.route}"`);
          api[verb](route.route, (req, res, next) => route[verb]({server: this, req, res, next}));
        }
      }
    }

    api.listen(8080, () => {
      console.log(api.name, "listening at", api.url)
    });
  }

  setupDB() {
    console.log('Setting up database');
    const db = this.db = new sqlite.Database(':memory:');
    db.serialize(() => {
      db.run(`CREATE TABLE Users (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      )`);

      db.run(`CREATE TABLE Activities (
        user_id INTEGER NOT NULL,
        description VARCHAR(255) NOT NULL,
        points INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES Users(id)
      )`);
    });
  }
}
