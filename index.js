import cookieParser from 'cookie-parser';
import express from 'express';
import { PORT } from './src/common/constants/app.constant.js';
import { appError } from './src/common/helpers/app-error.helper.js';
import rootRouter from './src/router/root.router.js';

const app = express();

//middleware parse body
app.use(express.json());
//middleware parse cookie
app.use(cookieParser());


app.use('/api', rootRouter);
app.use(appError);
const runPORT = PORT || 3069;

app.listen(runPORT,()=>{
  console.log(`App is listening on port ${PORT}`);
});