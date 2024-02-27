const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PhoneBook = require('./model/Phonebook');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});

const DB = 'mongodb+srv://phonebook:phonebook@cluster0.63zsoxw.mongodb.net/phonebbok';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected..');
});

app.post('/add-phone', async (req, res) => {
  const phoneNumber = new PhoneBook(req.body);
  try {
    await phoneNumber.save();
    res.status(201).json({
      status: 'Success',
      data: {
        phoneNumber,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});

app.get('/get-phone', async (req, res) => {
  try {
    const phoneNumbers = await PhoneBook.find({});
    res.status(200).json({
      status: 'Success',
      data: {
        phoneNumbers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});

app.put('/update-phone/:id', async (req, res) => {
  try {
    const updatedPhone = await PhoneBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPhone) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 'Success',
      data: {
        updatedPhone,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});

app.delete('/delete-phone/:id', async (req, res) => {
  try {
    const deletedPhone = await PhoneBook.findByIdAndDelete(req.params.id);

    if (!deletedPhone) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Contact not found',
      });
    }

    res.status(204).json({
      status: 'Success',
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});
