import express from 'express';
import controllerRouting from './routes/index';

const APP_PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

controllerRouting(app);

app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);
});
