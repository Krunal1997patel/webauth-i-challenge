const express = require('express');
const userDB = require('./user-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    userDB.allUser()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({
            err: 'can not all user'
        })
    })
})


module.exports = router;
