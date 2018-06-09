var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    // _id     : { type: String, default: function() {return new }},
    ranking : { type: Number, default: 50},
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

    getUserByUserName: function (username) {
        return new Promise((resolve, reject) => {
            User.find({ username: username }).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            });
        });
    },

    getUserByTag: function(tag, isActive) {
        return new Promise((resolve, reject) => {
            User.find({tags: tag, isActive: isActive}).sort({ranking: -1}).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            });
        });
    },
    updateUserByName: function (username, updateField, updateValue) {
        return new Promise((resolve, reject) => {
            let query = {};
            query[updateField] = updateValue;
            User.findOneAndUpdate({ username: username }, query).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            });
        });
    },
    addToUserRanking: function (username, val) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ username: username }, {$inc: {ranking: val}}).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            });
        });
    },

}