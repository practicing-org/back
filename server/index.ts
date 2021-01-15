
import app from './App';
import {createServer} from 'http';

const port: number = Number(process.env.PORT) || 3030;

createServer(app)
    .listen(port, ()=> console.log('server started'))
    .on('error', (err:any)=>{console.error(err)});
