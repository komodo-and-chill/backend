const sqlite = require('sqlite3').verbose();

module.exports = class Server {
  constructor(config) {
    this.db = null;
    this.setupDB();
  }

  setupDB() {
    console.log('Setting up database');
    const db = this.db = new sqlite.Database(':memory:');
    db.serialize(() => {
      db.run('CREATE TABLE test (info TEXT)');
      const statement = db.prepare('INSERT INTO test VALUES (?)');
      for (const val of ['Hello', 'World']) {
        statement.run(val);
      }
      statement.finalize();
    });
  }
}
