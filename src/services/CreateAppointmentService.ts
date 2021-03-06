import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import AppError from '../errors/AppError';

interface Request {
	date: Date;
	provider_id: string;
}

class CreateAppointmentService {
	public async execute({ date, provider_id }: Request): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(AppointmentRepository);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw new AppError('Appointment already booked');
		}

		const appointment = appointmentRepository.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
