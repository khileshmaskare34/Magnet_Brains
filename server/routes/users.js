const express = require('express')
const router = express.Router();
const connectDatabase = require('../config/db');
const { register, login } = require('../controllers/userControllers');
const { checkTokenExp } = require('../middleware/AOuth');

router.get('/', (req, res)=>{
    res.send("users here");
})

router.post('/register', register)
router.post('/login', login)



module.exports = router;