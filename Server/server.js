
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

app.use(cors());

require('dotenv').config({path: '../.env'});
const mon=process.env.MONGO_CONNECTION_STRING;

const app = express();
app.use(express.json());
console.log(mon);

mongoose.connect(mon, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);


app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
