const TodoModel = require('../model/todoModel');

module.exports = {
  createTodo: (req, res, next) => {
    TodoModel.create(req.body);
  },
};
