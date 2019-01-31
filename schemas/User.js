const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = Schema({
 "email": { type: String, required: true, unique: true },
 "password": { type: String, required: true }
});

userSchema.pre('save', async function () {
 this.password = await bcrypt.hash(this.password + passwordSalt, 10);
});

module.exports = db.model('User', userSchema);