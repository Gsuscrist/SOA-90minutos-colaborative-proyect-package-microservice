
import express from 'express';
import {Signale} from 'signale';
import { packageRoutes } from './package/infrastructure/routes/packageRoutes';


const app = express();
const signale = new Signale();

app.use(express.json())

app.use('/package', packageRoutes);

app.listen(8080,()=>{
    signale.success("Server on line in port: 8080")
})
