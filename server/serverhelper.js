const userDAO = require('../model/usersDAO');

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
    getUserGivenTag: function(tag) {
        return new Promise((resolve, reject) => {
            userDAO.getUserByTag(tag).then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            })
        })
    }


}