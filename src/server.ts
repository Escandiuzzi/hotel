import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

const PORT = process.env.PORT || 3333;
const allowedOrigin = process.env.API_URL || 'http://localhost:3000';

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}`);
});
