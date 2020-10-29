const { Router } = require('express');
const { createTodo } = require('../controller/testController');

const router = Router();

router.post('/', createTodo);

module.exports = router;
