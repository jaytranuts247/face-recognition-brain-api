const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	// const saltRounds = 10;
	if (!email || !name || !password) {
		return res.status(400).json("incorrect form submission !!");
	}
	const hash = bcrypt.hashSync(password);
	console.log(email, name, hash);

	db.transaction((trx) => {
		trx
			.insert({
				hash: hash,
				email: email,
			})
			.into("login")
			.returning("email")
			.then((loginEmail) => {
				return (
					trx("users")
						.returning("*")
						.insert({
							email: loginEmail[0],
							name: name,
							joined: new Date(),
						})
						// .into("users")
						// .returning("*")
						.then((user) => {
							res.json(user[0]);
						})
				);
			})
			.then(trx.commit)
			.catch(trx.rolllback);
	}).catch((err) => res.status(400).json(err));
};

module.exports = {
	handleRegister,
};
