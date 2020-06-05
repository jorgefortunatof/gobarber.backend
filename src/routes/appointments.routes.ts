import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
	const appointmentRepository = getCustomRepository(AppointmentRepository);
	const allAppointments = response.json(await appointmentRepository.find());
	return allAppointments;
});

appointmentsRouter.post('/', async (request, response) => {
	try {
		const { provider_id, date } = request.body;
		const parsedDate = parseISO(date);
		const createAppointmentService = new CreateAppointmentService();
		const appointment = await createAppointmentService.execute({
			date: parsedDate,
			provider_id,
		});

		return response.json(appointment);
	} catch (err) {
		return response.status(400).json({ erro: err.message });
	}
});

export default appointmentsRouter;
