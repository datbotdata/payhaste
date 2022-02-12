import * as functions from "firebase-functions";
import express from 'express';
import cors from 'cors';
import { employeeRouter } from "./routers/employees.router";

const app = express();

app.use(cors());
app.use(express.json());

// Routers
app.use('/employee', employeeRouter);

exports.app = functions.https.onRequest(app);