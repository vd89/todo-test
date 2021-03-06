const request = require('supertest');

const app = require('../../app');
const endPointUrl = '/todos/';
const newTodo = require('../mock-data/new-todo.json');

let firstTodo;
let newTodoId;
const nonExistingTodoId = '5d5fff416bef3c07ecf11f77';
const testData = { title: 'Make integration test for PUT', done: true };

describe(endPointUrl, () => {
  test('GET' + endPointUrl, async () => {
    const response = await request(app).get(endPointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });
  test('GET by Id' + endPointUrl + ':todoId', async () => {
    const response = await request(app).get(endPointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });
  test("GET todoby id doesn't exist" + endPointUrl + ':todoId', async () => {
    const response = await request(app).get(endPointUrl + nonExistingTodoId);
    expect(response.statusCode).toBe(404);
  });
  it('POST ' + endPointUrl, async () => {
    const response = await request(app).post(endPointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });
  it('should return error 500 on malformed data with POST' + endPointUrl, async () => {
    const response = await request(app).post(endPointUrl).send({ title: 'Missing done property' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: 'Todo validation failed: done: Path `done` is required.',
    });
  });
  it('PUT ' + endPointUrl, async () => {
    const testData = { title: 'Make integration test for PUT', done: true };
    const res = await request(app)
      .put(endPointUrl + newTodoId)
      .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });
  it('should return 404 on PUT ' + endPointUrl, async () => {
    const testData = { title: 'Make integration test for PUT', done: true };
    const res = await request(app)
      .put(endPointUrl + nonExistingTodoId)
      .send(testData);
    expect(res.statusCode).toBe(404);
  });
  test('HTTP DELETE', async () => {
    const res = await request(app)
      .delete(endPointUrl + newTodoId)
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });
  test('HTTP DELETE 404', async () => {
    const res = await request(app)
      .delete(endPointUrl + nonExistingTodoId)
      .send();
    expect(res.statusCode).toBe(404);
  });
});
