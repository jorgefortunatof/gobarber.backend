import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
	try {
		return response.json();
	} catch (err) {
		return response.status(400).json({ erro: err.message });
	}
});

export default usersRouter;
