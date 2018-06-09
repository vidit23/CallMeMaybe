const userDAO = require('../model/usersDAO');
const tagDAO = require('../model/tagsDAO');

module.exports = {
    getUser: function() {
        return new Promise((resolve, reject) => {
            userDAO.getUserById('5b1be82662effc0e6fa58539').then(doc => {
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