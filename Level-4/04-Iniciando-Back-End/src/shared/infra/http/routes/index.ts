import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/users/http/routes/sessions.routes';
import userRouter from '@modules/users/http/routes/users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
