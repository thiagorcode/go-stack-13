import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns'; // Manipulação de datas

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(
    appointment => isEqual(parsedDate, appointment.date), // IsEqual é utilizado para verificar se duas datas são iguais;
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'this appointment is already booked' });
  }
  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRouter;
