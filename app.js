const express = require('express');
const dbConnect = require('./mongodb/mongoConnect');
const route = require('./routes/todoRoutes');

const app = express();

app.use(express.json());
app.use('/todos', route);
app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!!!!!!' });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});
// db connection
dbConnect();

module.exports = app;
