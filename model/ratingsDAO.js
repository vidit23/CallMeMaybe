var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
    // _id     : { type: String, default: function() {return new }},
    giver : { type: String, default: ''},
    receiver : { type: String, default: ''},
    whoCalled : { type: String, default: ''},
    isHelp : {type: Boolean, default: false},
    lastModified: { type: Date, default: Date.now},
});

var Ratings = mongoose.model('ratingsDAO', ratingSchema, 'ratingsDAO');

module.exports = {
    getRatingLatest: function(giver, receiver, whoCalled) {
        return new Promise((resolve, reject) => {
            Ratings.find({giver: giver, receiver: receiver, whoCalled: whoCalled}).sort({lastModified: -1})
            .then(result => {
                if(result.length === 0) {
                    return resolve([]);
                } else {
                    return resolve(result[0]);
                }
            }).catch(err => {
                return reject(err);
            })
        });
    },
    removeRating: function(id) {
        return new Promise((resolve, reject) => {
            Ratings.findOneAndRemove({_id: id}).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        });
    },
    updateRating: function(giver, receiver, whoCalled, isHelp) {
        return new Promise((resolve, reject) => {
            let ratingObj = { giver: giver, receiver: receiver, 
                whoCalled: whoCalled, lastModified: Date.now(), isHelp: isHelp };
            Ratings.findOneAndUpdate({giver: giver, receiver: receiver, whoCalled: whoCalled}, 
                ratingObj, {upsert: true}).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        });
    }
}