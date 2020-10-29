const express = require('express');
const dbConnect = require('./mongodb/mongoConnect');
const route = require('./routes/todoRoutes');

const app = express();

app.use(express.json());
app.use('/todos', route);
app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!!!!!!' });
});

// db connection
dbConnect();

module.exports = app;
