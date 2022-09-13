import { run } from './configs/database.config'
import express from 'express';
import "reflect-metadata"
import dotenv from 'dotenv';
import router from './routes'
import config from './configs';
import handleError from './middlewares/error-hanlder'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

config(app)
router(app)
app.use(handleError);

run()
  .then(() => console.log('Database initializated'))
  .catch(err => console.error('Error during database initialization: ', err))

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
