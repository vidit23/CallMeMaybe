var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    // _id     : { type: String, default: function() {return new }},
    ranking : { type: Number, default: 50},
    totalCases : { type: Number, default: 0},
    solvedCases : { type: Number, default: 0},
    rating : { type: Number, default: 0},
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
            User.find({tags: tag, isActive: isActive}).sort({rating: -1}).then(result => {
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
    addToUserField: function (username, updateField, updateValue) {
        return new Promise((resolve, reject) => {
            let query = {};
            let incQuery = {};
            query[updateField] = updateValue;
            incQuery['$inc'] = query;
            User.findOne({ username: username }).then(result => {
                if(result && result.totalCases && updateField==='totalCases') {
                    let score = ((2 * result.solvedCases) - result.totalCases)/result.totalCases;
                    incQuery['$set'] = {rating: score};
                }
                console.log('incQuery ', incQuery);
                return User.findOneAndUpdate({ username: username }, incQuery);
            }).then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            });
        });
    },

}