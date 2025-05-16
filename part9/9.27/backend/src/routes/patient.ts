import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient, EntryWithoutId } from '../types';
import { newEntrySchema, entryWithoutIdSchema } from '../utils';
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

router.post('/:id/entries', (req, res) => {
    console.log(req,res);
    try {
        // Validate entry without id
        const entryWithoutId: EntryWithoutId = entryWithoutIdSchema.parse(req.body);
        const patient = patientService.findById(String(req.params.id));
        
        if (!patient) {
            res.status(404).send({ error: 'Patient not found' });
            return;
        }

        const newEntry = patientService.addEntry(patient, entryWithoutId);
        res.json(newEntry);
    } catch (error: unknown) {
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