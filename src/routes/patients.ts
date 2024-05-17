import express from "express";
import patientService from "../services/patientService";
import{ toNewPatientEntry, toNewEntry } from "../../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatient());
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientService.getPatientById(id));
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong ';
        if(error instanceof Error) {
            errorMessage += 'Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    console.log('post id entry', req.body)
    const patientId = (req.body.id);
    try {
        const newEntry = toNewEntry(req.body);
        console.log('parse Entry', newEntry)
        const addedEntry = patientService.createEntry(patientId, newEntry);
        res.json(addedEntry);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong';
        if(error instanceof Error) {
            errorMessage += 'Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router;