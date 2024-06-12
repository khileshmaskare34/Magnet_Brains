const User = require('../models/user')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
require('dotenv').config();

exports.register = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const existingUser = await User.findOne({username: username})
        if(existingUser){
            return res.status(400).json({error: "Username already exist"})
        }

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt); 
        const user = new User
        ({
            username: username,
            password: hash
        });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // res.cookie('JWT_Token', token, {httpOnly: true, secure: true, maxAge: 10 * 60 * 1000 })
        res.status(201).json({ token });

    } catch (error) {
      res.status(400).json({ error: 'Error registering user' });
  }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.cookie('JWT_Token', token, {httpOnly: true, secure: true, maxAge: 10 * 60 * 1000 })

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };