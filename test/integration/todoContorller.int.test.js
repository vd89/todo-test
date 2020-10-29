const request = require('supertest');

const app = require('../../app');
const endPointUrl = '/todos';
const newTodo = require('../mock-data/new-todo.json');

describe(endPointUrl, () => {
  it('POST ' + endPointUrl, async () => {
    const response = await request(app).post(endPointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
});
