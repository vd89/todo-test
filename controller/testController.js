const TodoModel = require('../model/todoModel');

module.exports = {
  createTodo: async (req, res, next) => {
    const newLocal = await TodoModel.create(req.body);
    res.status(201).json(newLocal);
  },
};
