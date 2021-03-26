import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  // Com a atualização do TypeScript, isso se faz necessário
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.update_at,
  };

  return response.json(userWithoutPassword);
});
/*
 *  ensureAuthenticated => Pois precisamos que o usuário esteja autenticado
 *para podemos poder inserir ou alterar a foto do usuário.
 */
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id, // Dado do JWT - ensureAuthenticated
      avatarFilename: request.file.filename,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.update_at,
    };

    return response.json(userWithoutPassword);
  },
);
export default usersRouter;
