const TodoController = require('../../controller/testController');
const TodoModel = require('../../model/todoModel');
TodoModel.create = jest.fn();

describe('TodoController.createTodo', () => {
  it('Should have a creatTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function');
  });
  it('Should call TodoModel.create', () => {
    TodoController.createTodo();
    expect(TodoModel.create).toBeCalled();
  });
});
