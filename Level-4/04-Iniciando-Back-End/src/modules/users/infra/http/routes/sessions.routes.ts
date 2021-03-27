import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();

  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService(usersRepository);
  const userAuthenticate = await authenticateUser.execute({
    email,
    password,
  });

  // ! Excluimos o Password dos dados enviados para o front, pois melhor maneira dentro Ts(Por enquanto)
  /* verificar melhor maneira de passar o user para front sem prejudicar o mesmo.
   */

  const user = {
    id: userAuthenticate.user.id,
    name: userAuthenticate.user.name,
    email: userAuthenticate.user.email,
    created_at: userAuthenticate.user.created_at,
    updated_at: userAuthenticate.user.update_at,
  };

  return response.json({ user, token: userAuthenticate.token });
});

export default sessionsRouter;
