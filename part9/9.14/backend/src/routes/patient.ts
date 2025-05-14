import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import { newEntrySchema } from '../utils';
import { z } from "zod";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatient());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(String(req.params.id));
    if(patient)
        res.send(patient);
    else
        res.sendStatus(404);
});

router.post('/', (req, res) => {
    try{
        const newPatientEntry = newEntrySchema.parse(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown){
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});

router.post('/', (_req,res) => {
    res.send('Saving a diary!');
});

export default router;