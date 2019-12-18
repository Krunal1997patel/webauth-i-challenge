const express = require('express');

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('you asre up and runing')
})

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;