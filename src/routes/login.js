module.exports = {
  'route': '/api/login',
  post({server, req, res, next}) {
    const { email, password } = req.params;
    if (!email || !password) {
      return res.json(400, { message: 'Email and password required' });
    }

    server.db.get('SELECT * FROM Users WHERE email=? AND password=?', email, password, (err, user) => {
      if (err || !user) {
        return res.json(400, { message: (err || "Invalid login details").toString() });
      } else {
        return res.json({ message: 'Logged in', ...user });
      }
    });

    return next();
  }
}