function dashboard(req, res) {
  // res.send("Welcome to your dashboard!");
  const email = req.user.email;
  res.render('dashboard', { email });
}

module.exports = { dashboard };
