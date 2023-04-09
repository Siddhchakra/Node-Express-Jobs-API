import { Router } from 'express';
import { registerUser, signInUser } from '@src/controllers';

//Another way to create routes for EXPRESS
const router = Router();

router.route('/auth').get(signInUser).post(registerUser);

export default router;
