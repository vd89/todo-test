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
      return res.status(200).json(allTodos);
    } catch (err) {
      next(err);
    }
  },
  getTodoById: async (req, res, next) => {
    try {
      const singleTodo = await TodoModel.findById(req.params.todoId);
      if (singleTodo) {
        return res.status(200).json(singleTodo);
      } else {
        return res.status(404).send();
      }
    } catch (err) {
      next(err);
    }
  },
  updatedTodo: async (req, res, next) => {
    try {
      const updateTodo = await TodoModel.findByIdAndUpdate(req.params.todoId, req.body, {
        new: true,
        useFindAndModify: false,
      });
      if (updateTodo) {
        return res.status(200).json(updateTodo);
      } else {
        return res.status(404).send();
      }
    } catch (err) {
      next(err);
    }
  },
};
