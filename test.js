
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Lead = require('./models/Lead'); 


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://baseline85611:deqShy5XLx9bAKYq@cluster0.2bbl8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.post('/webhook/zoho/leads', async (req, res) => {
  try {
    const webhookData = req.body; 
    console.log('Headers:', req.headers);
    console.log('Query Params:', req.query);
    console.log('Received webhook data:', webhookData);

    const lead = new Lead(webhookData);

    await lead.save();

    console.log('Lead saved successfully:', lead);
    res.status(200).send('Success');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5000, () => {
  console.log(`Server running on port ${"5000"}`);
});
