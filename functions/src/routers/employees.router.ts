import express, { Request, Response } from 'express';
import * as EmployeeService from '../services/employees.service';
import { Employee } from '../../../models/employee';
// import { Dependent } from '../../../models/dependent';

export const employeeRouter = express.Router();

employeeRouter.get('/', async (req: Request, res: Response) => {
	try {
		const employees: Employee[] = await EmployeeService.getEmployees();

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