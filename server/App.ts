import express from "express";
import user from './api/user/user';
import cors from "cors";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(user)


export default app;