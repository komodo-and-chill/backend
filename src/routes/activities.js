module.exports = {
  'route': '/api/activities',
  post({server, req, res, next}) {
    const { description, points, user_id } = req.params;
    
    if (!description || !points || !user_id) {
      return res.json(400, { message: 'Description/points/userid required' });
    }

    server.db.run('INSERT INTO Activities VALUES (?, ?, ?)', +user_id, description, +points, err => {
      if (err) {
        return res.json(400, { message: err.toString() });
      } else {
        return res.json({ message: 'Activity created' });
      }
    });

    return next();
  },

  get({ server, req, res, next }) {
    const { user_id } = req.params;

    server.db.all('SELECT * FROM Activities WHERE user_id=?', +user_id, (err, activities) => {
      points = activities.reduce((acc, activity) => acc + activity.points, 0);
      res.json({ points, activities });
      next();
    });
  }
}