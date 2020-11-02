const TodoController = require('../../controller/todoController');
const TodoModel = require('../../model/todoModel');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodo = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();

let req, res, next;
const todoId = '5f9ac5057db8c8fb4bc177bd';
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

// Update todo controller function
describe('TodoController  should have a update todo function ', () => {
  it('should have a TodoController.updateTodo function', async () => {
    expect(typeof TodoController.updatedTodo).toBe('function');
  });
  it('should update with TodoModel.findByIdAndUpdate', async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    await TodoController.updatedTodo(req, res, next);
    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
      new: true,
      useFindAndModify: false,
    });
  });

  it('should have a response with json data and http code 200', async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
    await TodoController.updatedTodo(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it('should handle errors', async () => {
    const errorMessage = { message: 'Error' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await TodoController.updatedTodo(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

// GET request to get single todo by id

describe('TodoController.getTodoById', () => {
  it('should have a getTodoById', () => {
    expect(typeof TodoController.getTodoById).toBe('function');
  });
  it('should call TodoModel.findById with route parameter', async () => {
    req.params.todoId = todoId;
    await TodoController.getTodoById(req, res, next);
    expect(TodoModel.findById).toBeCalledWith(todoId);
  });
  it('should return response code 200 and body with json', async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it('should do error handling', async () => {
    const errorMessage = { message: 'error finding todoModel' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findById.mockReturnValue(rejectedPromise);
    await TodoController.getTodoById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

// GET request to get all the todos
describe('TodoController.getTodos', () => {
  it('should have a getTodos function ', () => {
    expect(typeof TodoController.getTodos).toBe('function');
  });
  it('should call TodoModal.find({})', async () => {
    await TodoController.getTodos(req, res, next);
    expect(TodoModel.find).toHaveBeenCalledWith({});
  });
  it('should return response code 200 ', async () => {
    TodoModel.find.mockReturnValue(allTodo);
    await TodoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodo);
  });
  it('should handle error in getTodos', async () => {
    const errorMessage = { message: 'Error Finding' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.find.mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

// POST request to create TODO
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
  it('should handle errors ', async () => {
    const errorMessage = { message: 'Done property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
