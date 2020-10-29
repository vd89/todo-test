const TodoController = require('../../controller/testController');
const TodoModel = require('../../model/todoModel');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');

TodoModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it('Should have a creatTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function');
  });
  it('Should call TodoModel.create', () => {
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });
  it('should return 201 response in statusCode', async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
});
