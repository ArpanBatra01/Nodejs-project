const User = require('../models/user');

app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;

        const newUser = new User({ name, email });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

