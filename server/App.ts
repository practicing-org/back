import * as express from "express";
import Hello from './router/hellorouter';

const app = express();

app.use(Hello)


export default app;