import * as functions from "firebase-functions";
import express from 'express';
import cors from 'cors';
import { environment } from './environments/environment';

const PORT: number = environment.port;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
	console.log(`API listening on port ${PORT}`);
});

exports.app = functions.https.onRequest(app);