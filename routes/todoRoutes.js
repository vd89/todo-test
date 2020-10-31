const { Router } = require('express');
const { createTodo, getTodos, getTodoById } = require('../controller/todoController');

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.get('/:todoId', getTodoById);

module.exports = router;
