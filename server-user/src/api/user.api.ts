import {Router} from 'express';
import {userController} from '../controllers/user.controller';

const router = Router();

/**
 * single
 */
router.get('/:id', async (req: any, res, next) => {
	try {
		res.send(await userController.find(req.user, req.params.id, parseInt(req.query.type, 10), req.query.fields));
	} catch (error) {
		next(error);
	}
});

/**
 * list
 */
router.get('/', async (req: any, res, next) => {
	try {
		res.send(await userController.findMany(req.user, req.query));
	} catch (error) {
		next(error);
	}
});

/**
 * create
 */
router.post('/', async (req, res, next) => {
	try {
		res.send(await userController.create(req.body));
	} catch (error) {
		next(error);
	}
});

/**
 * update password
 */
router.put('/password', async (req: any, res, next) => {
	try {
		res.send(await userController.updatePassword(req.user, req.body.token, req.body.password));
	} catch (error) {
		next(error);
	}
});

/**
 * update
 */
router.put('/:id', async (req: any, res, next) => {
	try {
		res.send(await userController.update(req.user, req.params.id, req.body));
	} catch (error) {
		next(error);
	}
});

/**
 * delete
 */
router.delete('/:id', async (req: any, res, next) => {
	try {
		res.send(await userController.remove(req.params.id));
	} catch (error) {
		next(error)
	}
});

export = router;