import express from 'express'
import router from './routes/patients';

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

app.use('/api/diagnosis', router);

app.use('/api/patients', router);


const PORT = 3003

app.listen(PORT, () => {
    console.log(`live from PORT: ${PORT}`);

})