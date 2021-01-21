/**
 * 1 -Um repositório é a conexão entre a persistência (um banco de dados por exemplo) e a nossa aplicação.
 É pelo repositório onde iremos buscar as informações no banco (ou onde estiver salva) e devolver para a aplicação.
 2 -  Geralmente usa uma repositório para cada model.
 */
import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

// Data Transfer Object - DTO

interface CreateAppointDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    //  IsEqual é utilizado para verificar se duas datas são iguais;

    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointDTO): Appointment {
    // Ao realizar return deve se informar qual o tipo está sendo retornado, no caso o Appointment.

    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
