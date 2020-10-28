const TodoController = require('../../controller/testController');

describe('TodoController.createTodo', () => {
  it('Should have a creatTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function');
  });
});
