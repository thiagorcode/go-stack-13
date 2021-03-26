import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();
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
