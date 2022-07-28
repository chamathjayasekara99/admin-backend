import 'dotenv/config';
const bodyParser = require('body-parser');
import express from 'express';

import cors from 'cors';
import { connect } from './utils/db.connection';
import logger from './utils/logger';
import {UserRouter,ProjectsRouter,ToolAndTechRouter, PLAndFrameworksRouter,CertificatesRouter,AchievementsRouter,EducationsRouter} from './api/routes';

const app = express();
const PORT = process.env.PORT || '8040';
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '20mb' }));

app.get('/', (req, res, next) => {
  next();
});

app.use('/user', UserRouter);
app.use('/projects',ProjectsRouter)
app.use('/chamath-jayasekara', UserRouter);
app.use('/toolsAndTechs', ToolAndTechRouter)
app.use('/plandframework', PLAndFrameworksRouter)
app.use('/certificates', CertificatesRouter)
app.use('/acheivements', AchievementsRouter)
app.use('/education', EducationsRouter)

app.listen(PORT, () => {
  logger.info(`Server is up and runnig on port ${PORT}`);
  connect();
});
