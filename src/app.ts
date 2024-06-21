
import express from 'express';
import {Signale} from 'signale';



const app = express();
const signale = new Signale();

app.use(express.json())



app.listen(8080,()=>{
    signale.success("Server on line in port: 8080")
})
