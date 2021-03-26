import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../infra/typeorm/enitities/Appointment';
/**
 * 1 -Um repositório é a conexão entre a persistência (um banco de dados por exemplo) e a nossa aplicação.
 É pelo repositório onde iremos buscar as informações no banco (ou onde estiver salva) e devolver para a aplicação.
 2 -  Geralmente usa uma repositório para cada model.
 */

// Data Transfer Object - DTO
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /**
   * A parti do momento que transformo minha função em uma função assicrona,
   * ela me devolve uma promise, por essa razão deve ser informado que o return
   * vai ser Promise<Appointment | null>
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
