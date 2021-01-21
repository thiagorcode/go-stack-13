import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

/**
 *  SOLID
 *
 * Dependency Inversion Principle (Solid) - Constructor:13
 * Single Resposability Principle
 *
 */

class CreateAppointmentService {
  // Não instaciamos novamente, mas recebemos sempre o mesmo repositório.
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('this appointment is already booked');
    }

    // DTO
    /* Ajuda a entender qual os parâmetros estão fazendo pois apresenta qual o argumento está faltando,
     * parametros nomeados.
     */
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
