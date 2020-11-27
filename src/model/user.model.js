const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	email: { type: String, index: { unique: true } },
	pwd: String
});
UserSchema.index({ email: 1 }, { unique: true })
const User = mongoose.model('user', UserSchema);

exports.User = User;
exports.saveUser = (userData) => {

	return new Promise((resolve, reject)=> {
		User.findOne({ email: userData.email }).then((exUser) => {
			if (exUser) {
				resolve(exUser)
			} else {
				new User(userData)
					.save()
					.then(resolve)
					.catch(reject);
			}
		})
	});
};
