const { Router } = require('express');
const { createTodo, getTodos } = require('../controller/todoController');

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);

module.exports = router;
