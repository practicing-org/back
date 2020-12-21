import 'source-map-support/register';
import {createServer} from 'http';
import app from '../App';
import * as express from "express";

const port: number = Number(process.env.PORT) || 3030;

createServer(app)
    .listen(port, ()=> console.log('server started'))
    .on('error', (err:any)=>{console.error(err)});