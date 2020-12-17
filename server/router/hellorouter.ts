import hello from '../api/hello/hello';
import { Router } from 'express';

    const route = Router();
    route.get("/", hello);
    
export default route;