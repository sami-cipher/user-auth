const { saveUser, User } = require("../model/user.model");
const { encodeJWT, decodeJWT } = require("../utils/jwt.utils")

exports.handleUserSignup = (req, response) => {
	const { name, email, pwd } = req.body;

	saveUser({ name, email, pwd }, { upsert: true }).then((suc) => {
		response.status(200).send({
			status: "success",
			message: "succesfully created user"
		})
	}).catch((error) =>
		response.status(500).send({
			status: "failure",
			error
		})
	)
}

exports.handleUserLogin = (req, response) => {
	const { email, pwd } = req.body;

	User.find({ email, pwd }).then((suc) => {
		response.setHeader('x-access-token', 'test token')

		console.log("___")
		response.status(200).send({
			status: "success",
			token: encodeJWT({ email }),
			message: "succesfully logged"
		})
	}).catch((error) =>
		response.status(500).send({
			status: "failure",
			error
		})
	)
}

exports.handleUserData = (req, response) => {
	const user = decodeJWT(req.headers["x-access-token"])
	User.find({ email: user.email }).then((data) => {
		response.status(200).send({
			status: "success",
			data,
		})
	}).catch((error) =>
		response.status(500).send({
			status: "failure",
			error
		})
	)
}

