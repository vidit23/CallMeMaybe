const userDAO = require('../model/usersDAO');
const tagDAO = require('../model/tagsDAO');

module.exports = {
    getUser: function(id) {
        return new Promise((resolve, reject) => {
            userDAO.getUserById(id).then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            })
        })
    },
    getDistinctTags: function() {
        return new Promise((resolve, reject) => {
            tagDAO.getDistinctTags().then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            })
        });
    },
    addTag: function(name) {
        return new Promise((resolve, reject) => {
            console.log('AddTag ', name);
            tagDAO.addTagByName(name).then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            })
        });
    },
}