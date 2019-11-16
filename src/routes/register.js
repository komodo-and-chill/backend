module.exports = {
  'route': '/api/register',
  post({server, req, res, next}) {
    const { email, password } = req.params;
    if (!email || !password) {
      return res.json(400, { message: 'Email and password required' });
    }

    server.db.run('INSERT INTO Users VALUES (NULL, ?, ?);', email, password, err => {
      if (err) {
        return res.json(400, { message: err.toString() });
      } else {
        server.db.get('SELECT * FROM Users WHERE email=?', email, (err, user) => {
          res.json({ message: 'Successfully registered!', user });
          return next();
        })
      }
    });
  }
}