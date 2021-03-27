import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentDTO';
/**
 * Rescrevemos os métodos dos repositórios para que tenhamos mais controle sobre eles
 * Exemplo: Quais parâmetros recebe e qual o tipo de retorno.
 */
export default interface IAppointmentsRepository {
  create(): ICreateAppointmentDto;
  findByDate(data: Date): Promise<Appointment | undefined>;
}
