import express, { Router } from 'express';
import isAdmin from '../../db/middleware/isAdmin';
import isUser from '../../db/middleware/isUser';
import * as arrayController from '../../controllers/arrayController';

export const router: Router = express.Router();

router.use(isUser)
// GET /array
router.get('/', arrayController.getArray);

// GET /array/:index
router.get('/:index', arrayController.getArrayIndex);

// POST /array
router.post('/', isAdmin, arrayController.postArray);

// PUT /array/:index
router.put('/:index', isAdmin, arrayController.putArrayIndex);

// DELETE /array
router.delete('/', isAdmin, arrayController.deleteArray);

// DELETE /array/:index
router.delete('/:index', isAdmin, arrayController.deleteArrayIndex);