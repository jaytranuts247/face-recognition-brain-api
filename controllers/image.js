const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: process.env.APIKEY,
});

const handleAPICall = (req, res) => {
	console.log("handleAPICall");
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => res.stauts(400).json(err));
};

const handleImage = (req, res, db) => {
	const { id } = req.body;

	db("users")
		.where("id", "=", id)
		.increment("entries", 1)
		.returning("entries")
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json("unable to get entries !!!"));
};

module.exports = {
	handleImage,
	handleAPICall,
};
