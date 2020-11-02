const { Router } = require('express');
const { createTodo, getTodos, getTodoById, updatedTodo, deleteTodo } = require('../controller/todoController');

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.get('/:todoId', getTodoById);
router.put('/:todoId', updatedTodo);
router.delete('/:todoId', deleteTodo);
module.exports = router;
