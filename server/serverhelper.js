const userDAO = require('../model/usersDAO');
const tagDAO = require('../model/tagsDAO');
const ratingDAO = require('../model/ratingsDAO');

function getUserHigherRating(giver, receiver, whoCalled) {
    return new Promise((resolve, reject) => {
        let num;
        userDAO.getUserByUserName(giver).then(result => {
            num = result.ranking;
            return userDAO.getUserByUserName(receiver);
        }).then(doc => {
            if (num > doc.ranking) {
                return resolve(giver);
            } else if (num < doc.ranking) {
                return resolve(receiver);
            } else {
                return resolve(whoCalled);
            }
        }).catch(err => {
            console.log('getUserHigherRating ', err);
            return reject(err);
        });
    });
}


module.exports = {
    getUser: function (username) {
        return new Promise((resolve, reject) => {
            userDAO.getUserByUserName(username).then(doc => {
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
            });
        });
    },
    matchIsHelp: function (giver, receiver, whoCalled, isHelp) {
        return new Promise((resolve, reject) => {
            console.log('match isHelp ', receiver);
            let exists = false, isMatch = false, daoIsHelp;
            return ratingDAO.getRatingLatest(receiver, giver, whoCalled).then(result => {
                if(result.length === 0) {
                    // If no previous record exist in ratingsDB, add to it
                    console.log('If no previous record exist in ratingsDB, add to it ');
                    return ratingDAO.updateRating(giver, receiver, whoCalled, isHelp);
                } else {
                    // If previous record exists, store it in memory and delete it from DB
                    exists = true;
                    daoIsHelp = result.isHelp;
                    console.log('If previous record exists, store it in memory and delete it from DB ');
                    return ratingDAO.removeRating(result._id);
                }
            }).then(() => {
                if (exists === true) {
                    if (daoIsHelp === isHelp) {
                        // add to both their ratings
                        console.log('add to both their ratings ');
                        let promiseArr = [userDAO.addToUserRanking(giver, 1), userDAO.addToUserRanking(receiver, 1)];
                        return Promise.all(promiseArr);
                    } else {
                        // find on with higher rating, reduce the other ones rating
                        console.log('find on with higher rating, reduce the other ones rating');
                        return getUserHigherRating(giver, receiver, whoCalled);
                    }
                } else {
                    // Nothing to do, return empty
                    return;
                }
            }).then(doc => {
                if (typeof doc === 'string' && doc === giver) {
                    console.log('giver is greater ');
                    let promiseArr = [userDAO.addToUserRanking(giver, 1), userDAO.addToUserRanking(receiver, -1)];
                    return Promise.all(promiseArr);
                } else if (typeof doc === 'string' && doc === receiver) {
                    console.log('receiver is greater ');
                    let promiseArr = [userDAO.addToUserRanking(giver, -1), userDAO.addToUserRanking(receiver, 1)];
                    return Promise.all(promiseArr);
                } else {
                    return;
                }
            }).then(() => {
                return resolve();
            }).catch(err => {
                return reject(err);
            });
        });
    }
}