import express from "express";
import router from './api/index';
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded())
app.use(express.json());
app.use(cors());
console.log(__dirname);
app.use('/image', express.static(__dirname+'/upload'))
app.use(router);


export default app;