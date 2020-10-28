const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!!!!!!' });
});

app.listen(3000, () => {
  console.log(`server is running on the port 3000...`);
});
