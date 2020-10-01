const functions = require('firebase-functions');
const express = require("express");
const cors = require('cors');
// const { response } = require('express');

const stripe = require("stripe")("sk_test_51HWL9fAIN1ggyqv7LMUFRo9Kbfv5cayx0jXsjEgqWJcNT3sx7zXPKevEYkI4SVPae1YK4yG8xTDbtRFrogjEMYUm00Cwp6l8Mf")

// API

// app config
const app = express();
// middlewares
app.use(cors({ origin: true }));
    // allows as to send data and pass to the json format
app.use(express.json());

// API routes

app.get('/', (request, response) => response.status(200).send('hello world'))

// app.get('/mike', (request, response) => response.status(200).send('hello mike'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment request recieved for the amount >>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  //subunits of the currency
        currency: 'usd',
    });

    // ok - created
    response.status(200).send({
        clientSecret: paymentIntent.client_secret,
    })
})
// listen command

exports.api = functions.https.onRequest(app)

// expample endpoint
// http://localhost:5001/clone-57143/us-central1/api