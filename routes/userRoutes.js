const express = require('express');
const router = express.Router();
const User = require('../models/user.js');



router.post('/', async (req, res) => {

  try {
    const newUser = new User(req.body);

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);


  } catch (err) {

    res.status(400).json({ message: err.message });

  }
});

router.get('/', async (req, res) => {

  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });

  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;