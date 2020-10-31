const request = require('supertest');

const app = require('../../app');
const endPointUrl = '/todos';
const newTodo = require('../mock-data/new-todo.json');

let firstTodo;
describe(endPointUrl, () => {
  test('GET' + endPointUrl, async () => {
    const response = await request(app).get(endPointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
  });
  test('GET by Id' + endPointUrl + ':todoId', async () => {
    const response = await request(app).get(endPointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toBeDefined(firstTodo.title);
    expect(response.body[0].done).toBeDefined(firstTodo.done);
  });
  it('POST ' + endPointUrl, async () => {
    const response = await request(app).post(endPointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
  it('should return error 500 on malformed data with POST' + endPointUrl, async () => {
    const response = await request(app).post(endPointUrl).send({ title: 'Missing done property' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: 'Todo validation failed: done: Path `done` is required.',
    });
  });
});
