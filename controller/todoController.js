const TodoModel = require('../model/todoModel');

module.exports = {
  createTodo: async (req, res, next) => {
    try {
      const newLocal = await TodoModel.create(req.body);
      res.status(201).json(newLocal);
    } catch (err) {
      next(err);
    }
  },
  getTodos: async (req, res, next) => {
    try {
      const allTodos = await TodoModel.find({});
      res.status(200).json(allTodos);
    } catch (err) {
      next(err);
    }
  },
};
