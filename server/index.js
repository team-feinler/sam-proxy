const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const app = express();
const hosts = require('./hosts');

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));

app.get('/reviews/bundle', async (req, res) => {
  try {
    const { data: bundle } = await axios.get(`${hosts.reviews}/reviews_bundle.js`)
    res.status(200).send(bundle)
  } catch (err) {
    res.status(500).json({ error: err })
  }
});

app.post('/review', async (req, res) => {
  try {
    console.log(req.body)
    const { data } = await axios.post(`${hosts.reviews}/review`, req.body)
    res.status(201).send(data)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.get('/Reviews*', async (req, res) => {
  try {
    const { data } = await axios.get(`${hosts.reviews}${req.url}`)
    res.status(200).send(data)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

app.listen(port, () => console.log(`listening on port ${port}`));