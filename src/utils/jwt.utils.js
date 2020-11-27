const jwt = require("jsonwebtoken");
const JWT_SECRET = "jWt$3cr3t";
const JWT_EXPIRES_IN = "1d";

exports.decodeJWT = (token = "") => {
	if (token.startsWith("Bearer ")) {
		token = token.slice(7, token.length);
	}
	return new Promise((resolve, reject) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (decoded) {
			resolve(decoded)
		}
		if (err) {
			throw reject(err);
		}
		return resolve(null)
	}));
};

exports.encodeJWT = ({
	email,
}) =>
	jwt.sign(
		{
			email
		},
		JWT_SECRET,
		{
			expiresIn: JWT_EXPIRES_IN
		}
	);
