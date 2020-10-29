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
};
