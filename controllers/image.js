const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: process.env.APIKEY,
});

const handleAPICall = (req, res) => {
	console.log("handleAPICall", Clarifai.FACE_DETECT_MODEL);
	app.models
		// .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
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
