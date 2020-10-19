function dashboard(req, res) {
  // res.send("Welcome to your dashboard!");
  const username = req.user.username;
  res.render('dashboard', { username });
}

module.exports = { dashboard };
