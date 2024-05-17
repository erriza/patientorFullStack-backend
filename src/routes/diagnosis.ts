import express from "express";
import diagnosisService from '../services/diagnosisService';

const routerDiagnosis = express.Router();

routerDiagnosis.get('/', (_req, res) => {
    res.send(diagnosisService.getDiagnosis());
})

export default routerDiagnosis;