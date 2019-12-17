const bcrypt = require('bcryptjs');
const express = require('express');
const userDB = require('./user-model.js');

const router = express.Router();

router.get('/', (req, res) => {

    const body = req.headers;

    // console.log(username, password);

    if(!body.username || !body.password){
        res.status(400).json({
            message: `you have't login with right password or username`
        })
    }else{
        
        userDB.FindByUsername({username: body.username}).first()
        .then(user =>{
            if(user && bcrypt.compareSync(body.password, user.password)){
                userDB.allUser()
                    .then(user => {
                        res.status(200).json(user)
                    })
                    .catch(err => {
                        res.status(500).json({
                            err: 'can not get all user'
                        })
                    })
            }else{
                res.status(401).json({
                    message: `You shall not pass`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'can not get the user'
            })
        })
    }
})


module.exports = router;

// userDB.allUser()
//         .then(user => {
//             res.status(200).json(user)
//         })
//         .catch(err => {
//             res.status(500).json({
//                 err: 'can not all user'
//             })
//         })