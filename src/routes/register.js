module.exports = {
  'route': '/api/register',
  post({server, req, res, next}) {
    const { email, password } = req.params;
    if (!email || !password) {
      return res.json(400, { message: 'Email and password required' });
    }

    const statement = server.db.prepare('INSERT INTO Users VALUES (NULL, ?, ?)');

    statement.run(email, password, err => {
      if (err) {
        return res.json(400, { message: err.toString() });
      } else {
        return res.json({ message: 'Registered' });
      }
    });

    return next();
  }
}