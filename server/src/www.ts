import 'source-map-support/register';
import app from '../App';
import * as express from "express";

const port: number = Number(process.env.PORT) || 3030;


app.listen(port, ()=> console.log('server started'))
.on('error', err=>console.error(err));