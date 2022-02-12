import express, { Request, Response } from 'express';
import * as EmployeeService from '../services/employees.service';

export const employeeRouter = express.Router();

employeeRouter.get('/all', async (req: Request, res: Response) => {
	try {
		const benefits = await EmployeeService.getAll();

		res.status(200).send(benefits);
	} catch (e) {
		let message;
		if (typeof e === 'string') {
			message = e;
		}
		if (e instanceof Error) {
			message = e.message;
		}
		res.status(500).send(message);
	}
});

employeeRouter.delete('/reset', async (req: Request, res: Response) => {
	try {
		const result = await EmployeeService.resetEmployees();

		res.status(200).send([result]);
	} catch (e) {
		let message;
		if (typeof e === 'string') {
			message = e;
		}
		if (e instanceof Error) {
			message = e.message;
		}
		res.status(500).send(message);
	}
});

employeeRouter.get('/', async (req: Request, res: Response) => {
	try {
		const employees = await EmployeeService.getEmployees();

		res.status(200).send(employees);
	} catch (e) {
		let message;
		if (typeof e === 'string') {
			message = e;
		}
		if (e instanceof Error) {
			message = e.message;
		}
		res.status(500).send(message);
	}
});

employeeRouter.post('/', async (req: Request, res: Response) => {
	try {
		const result = await EmployeeService.createEmployee(req.body);

		res.status(200).send([result]);
	} catch (e) {
		let message;
		if (typeof e === 'string') {
			message = e;
		}
		if (e instanceof Error) {
			message = e.message;
		}
		res.status(500).send(message);
	}
});

employeeRouter.post('/dependent', async (req: Request, res: Response) => {
	try {
		const result = await EmployeeService.createDependent(req.body);

		res.status(200).send([result]);
	} catch (e) {
		let message;
		if (typeof e === 'string') {
			message = e;
		}
		if (e instanceof Error) {
			message = e.message;
		}
		res.status(500).send(message);
	}
});

employeeRouter.delete('/dependent/:id', async (req: Request, res: Response) => {
	let dependentId = parseInt(req.params.id);

	try {
		const result = await EmployeeService.removeDependent(dependentId);

		res.status(200).send([result]);
	} catch (e) {
		let message;
		if (typeof e === 'string') {
			message = e;
		}
		if (e instanceof Error) {
			message = e.message;
		}
		res.status(500).send(message);
	}
});