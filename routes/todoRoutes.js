const { Router } = require('express');
const { createTodo } = require('../controller/todoController');

const router = Router();

router.post('/', createTodo);

module.exports = router;
