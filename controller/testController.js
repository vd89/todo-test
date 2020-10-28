const TodoModel = require('../model/todoModel');

module.exports = {
  createTodo: (req, res, next) => {
    const createModel = TodoModel.create(req.body);
    res.status(201).json(createModel);
  },
};
