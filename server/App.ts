import express from "express";
import router from './api/index';
import cors from "cors";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(router);


export default app;