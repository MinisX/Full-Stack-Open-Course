import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';

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
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedEnty = patientService.addPatient({
        name, 
        dateOfBirth, 
        ssn, 
        gender, 
        occupation
    });

    res.json(addedEnty);
});

router.post('/', (_req,res) => {
    res.send('Saving a diary!');
});

export default router;