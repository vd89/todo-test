const { connect } = require('mongoose');

const dbConnect = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/todo-test', { useNewUrlParser: true, useUnifiedTopology: true });
    console.info('Mongodb connected');
  } catch (err) {
    console.error('Error connection to mongodb');
    console.error(err);
  }
};

module.exports = dbConnect;
