import express from "express";
import router from './api/index';
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded())
app.use(express.json());
app.use(cors());
app.use('/image', express.static('./upload'))
app.use(router);


export default app;