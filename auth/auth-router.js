const bcrypt = require('bcryptjs');

const express = require('express')

const userDB = require('../users/user-model.js');

const router = express.Router();

router.use(express.json());

router.post('/register', (req, res) => {
    const body = req.body;
    const hash = bcrypt.hashSync(body.password, 8);

   if(!body.username || !body.password){
       res.status(400).json({
            message: 'please provied name and password'
       })
   }else{
        
    body.password = hash

       userDB.addUser(body)
       .then(user => {
           res.status(201).json(user)
       })
       .catch(err => {
           res.status(500).json({
               error: 'can not sign up'
           })
       })
   }
})

router.post('/login', (req, res) =>{
    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).json({
            message: 'please prove username or password'
        })
    }else{
        
        userDB.FindByUsername({username}).first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){

                req.session.user = user

                res.status(201).json({
                    message: `Welcome back ${user.username}`, user
                })
            }else{
                res.status(401).json({
                    message: 'wrong username or password'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'user can not login'
            })
        })
    }

})





module.exports = router;