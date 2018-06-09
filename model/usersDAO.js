var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    // _id     : { type: String, default: function() {return new }},
    ranking : { type: Number, default: 1},
    isActive: { type: Boolean, default: false},
    age     : { type: Number, default: 21},
    name    : { type: String, default: 'Vidit'},
    gender  : { type: String, default: 'male'},
    company : { type: String, default: ''},
    email   : { type: String, default: ''},
    phone   : { type: Number, default: ''},
    about   : { type: String, default: ''},
    registered: { type: Date, default: Date.now},
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('usersDAO', userSchema, 'usersDAO');

module.exports = {
    userFunctions: User,

    getUserById: function(id) {
        return new Promise((resolve, reject) => {
            User.find({_id: id}).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        });
    }
}