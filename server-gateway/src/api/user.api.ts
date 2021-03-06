import {Router} from 'express';
import * as httpProxy from 'http-proxy';
import {userController} from '../controllers/user.controller';

const config = require('../../../tradejs.config');
const router = Router();

/**
 * Single
 */
router.get('/:id', async (req, res, next) => {
	try {
		res.send(await userController.find(req.user, req.params.id, req.query));
	} catch (error) {
		next(error);
	}
});

/**
 * List
 */
router.get('/', async (req, res, next) => {
	try {
		res.send(await userController.findMany(req.user, req.query));
	} catch (error) {
		next(error);
	}
});

/**
 * Follow
 */
router.post('/:id/follow', async (req, res, next) => {
	try {
		res.send(await userController.toggleFollow(req.user, req.params.id));
	} catch (error) {
		next(error);
	}
});

/**
 * Copy
 */
router.post('/:id/copy', async (req, res, next) => {
	try {
		res.send(await userController.toggleCopy(req.user, req.params.id));
	} catch (error) {
		next(error);
	}
});

/**
 * Create
 */
router.post('/', async (req, res, next) => {
	try {
		res.send(await userController.create(req.user, req.body));
	} catch (error) {
		next(error);
	}
});

/**
 * Update
 */
router.put('/:id', async (req, res, next) => {
	try {
		res.send(await userController.update(req.user, req.params.id, req.body));
	} catch (error) {
		next(error);
	}
});

export = router;