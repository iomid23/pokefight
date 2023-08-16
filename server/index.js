import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';

import routes from './routes/routes.js';

dotenv.config();
const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to DB');
}).catch((err) => console.log('Error', err));

mongoose.connection.on('error', (err) => console.log('Lost connection', err));

app.use('/pokemon', routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});