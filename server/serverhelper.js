const userDAO = require('../model/usersDAO');

module.exports = {
    getUser: function() {
        return new Promise((resolve, reject) => {
            userDAO.getUserById('5b1b780f0045134e103e8c03').then(doc => {
                return resolve(doc);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}