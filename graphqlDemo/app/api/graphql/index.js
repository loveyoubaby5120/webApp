'use strict';

import express from 'express';
import * as controller from './controller';

var router = express.Router();

router.get('/', controller.list);

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.put('/:id', controller.edit);

router.delete('/:id', controller.deleteById);

module.exports = router;
