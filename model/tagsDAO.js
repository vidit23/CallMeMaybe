var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    // _id     : { type: String, default: function() {return new }},
    name : { type: String, default: ''},
});

var Tags = mongoose.model('tagsDAO', tagSchema, 'tagsDAO');

module.exports = {
    getTagByName: function(name) {
        return new Promise((resolve, reject) => {
            Tags.find({name: name}).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        });
    },
    getDistinctTags: function() {
        return new Promise((resolve, reject) => {
            Tags.distinct('name').then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        });
    },
    addTagByName: function(name) {
        return new Promise((resolve, reject) => {
            let tagObj = {name: name};
            Tags.findOneAndUpdate({name: name}, tagObj, {upsert: true}).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        });
    }
}