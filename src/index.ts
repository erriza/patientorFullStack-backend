import express from 'express'
import router from './routes/patients';
import routerDiagnosis from './routes/diagnosis';

const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors());
app.get('/', (_req, res) => {
    res.send('Hello Full Stack')
})

app.get('/api/ping', (_req, res) => {
    res.send('pong')
})

app.use('/api/diagnosis', routerDiagnosis);

app.use('/api/patients', router);


const PORT = 3003

app.listen(PORT, () => {
    console.log(`live from PORT: ${PORT}`);

})