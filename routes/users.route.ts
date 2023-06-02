import express from 'express';
import * as controller from '../controller/users.controller';

const usersRouter = express.Router();

usersRouter.get('/current', controller.getCurrent);
usersRouter.put('/current', controller.updateCurrent);

export default usersRouter;
