var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
    // _id     : { type: String, default: function() {return new }},
    giver : { type: String, default: ''},
    receiver : { type: String, default: ''},
    calledWho : { type: String, default: ''},
    isHelp : {type: Boolean, default: false},
    lastModified: { type: Date, default: Date.now},
});

var Ratings = mongoose.model('ratingsDAO', ratingSchema, 'ratingsDAO');

module.exports = {
    getRatingLatest: function(giver, receiver, calledWho) {
        return new Promise((resolve, reject) => {
            Ratings.find({giver: giver, receiver: receiver, calledWho: calledWho}).sort({lastModified: -1})
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
    updateRating: function(giver, receiver, calledWho, isHelp) {
        return new Promise((resolve, reject) => {
            let ratingObj = { giver: giver, receiver: receiver, 
                calledWho: calledWho, lastModified: Date.now(), isHelp: isHelp };
            Ratings.findOneAndUpdate({giver: giver, receiver: receiver, calledWho: calledWho}, 
                ratingObj, {upsert: true}).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        });
    }
}