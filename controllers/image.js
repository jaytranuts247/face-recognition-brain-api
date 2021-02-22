const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: process.env.APIKEY,
});

const handleAPICall = (req, res) => {
	console.log("handleAPICall", Clarifai.FACE_DETECT_MODEL, process.env.APIKEY);
	app.models
		// .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		//53e1df302c079b3db8a0a36033ed2d15
		// a403429f2ddf4b49b307e318f00e528b
		.predict(
			{
				id: "53e1df302c079b3db8a0a36033ed2d15",
				version: "c0c0ac362b03416da06ab3fa36fb58e3",
			},
			req.body.input
		)
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
