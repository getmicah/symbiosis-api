var User = require('../models/user');

module.exports = function(app) {

	app.route('/users')
		.get(function(req, res) {
			User.find(function(err, users) {
				if (err) {
					res.send(err);
				}
				res.send(users);
			});
		})
		.delete(function(req, res) {
			User.find(function(err, users) {
				if (err) {
					res.send(err);
				}
				User.remove({}, function(err, user) {
					if (err) {
						res.send(err);
					}
					res.send({
						message: 'All Users deleted!'
					});
				});
			});
		});

	app.route('/users/:username')
		.get(function(req, res) {
			User.find({
			 	$or: [
					{email: req.params.username},
					{username: req.params.username}
				]
			}, function(err, users) {
				if (err) {
					res.send(err);
				}
				res.send(users[0]);
			});
		});

	// ID
	app.route('/users/id/:id')
		.get(function(req, res) {
			if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				User.findById(req.params.id, function(err, user) {
					if (err) {
						res.send(err);
					}
					res.send(user);
				});
			} else {
				res.send('error: invalid id')
			}
		})
		.put(function(req, res) {
			if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				User.findById(req.params.id, function(err, user) {
					if (err) {
						res.send(err);
					}
					user.newUser = req.body.newUser;
					user.username = req.body.username;
					user.displayName = req.body.displayName;
					user.save(function(err) {
						if (err) {
							res.send(err);
						}
						res.send({
							message: 'User updated!'
						});
					});
				});
			} else {
				res.send('error: invalid id')
			}
		})
		.delete(function(req, res) {
			if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				User.remove({
					_id: req.params.id
				}, function(err, user) {
					if (err) {
						res.send(err);
					}
					res.send({
						message: 'User deleted!'
					});
				});
			} else {
				res.send('error: invalid id')
			}
		});

	// EMAIL
	app.route('/users/email/:email')
		.get(function(req, res) {
			User.findOne({email: req.params.email}, function(err, user) {
				if (err) {
					res.send(err);
				}
				res.send(user);
			});
		});

	// USERNAME
	app.route('/users/username/:username')
		.get(function(req, res) {
			User.findOne({username: req.params.username}, function(err, user) {
				if (err) {
					res.send(err);
				}
				res.send(user);
			});
		});

};
