const userDAO = require('../model/usersDAO');
const tagDAO = require('../model/tagsDAO');

module.exports = {
    getUser: function (id) {
        return new Promise((resolve, reject) => {
            userDAO.getUserById(id).then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            });
        })
    },
    getUserByTag: function (tag) {
        return new Promise((resolve, reject) => {
            let userList = [];
            userDAO.getUserByTag(tag, true).then(resultTrue => {
                resultTrue.map(user => {
                    userList.push(user);
                });
                return userDAO.getUserByTag(tag, false);
            }).then(resultFalse => {
                return resultFalse.map(user => {
                    userList.push(user);
                });
            }).then(() => {
                return resolve(userList);
            }).catch(err => {
                return reject(err);
            });
        })
    },
    getDistinctTags: function () {
        return new Promise((resolve, reject) => {
            tagDAO.getDistinctTags().then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            });
        });
    },
    addTag: function (name) {
        return new Promise((resolve, reject) => {
            console.log('AddTag ', name);
            tagDAO.addTagByName(name).then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            });
        });
    },
    updateUserByName: function (username, updateField, updateValue) {
        return new Promise((resolve, reject) => {
            console.log('Update name ', username);
            userDAO.updateUserByName(username, updateField, updateValue).then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            })
        });
    }
}