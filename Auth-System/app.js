import express from 'express';
import 'dotenv/config.js';
import cors from "cors";
import userRoutes from './routers/UserRoutes.js';

//initialize express app
const app = express();

//Enable CORS to frontend
let corsOptions = {
  origin: process.env.ORIGIN

}

//middleware
app.use(express.json());
app.use(cors(corsOptions));

try
{
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to port ${process.env.PORT || 3000}...`);
});
}catch(e){
    console.error('Error starting the server:', e);
}



app.use  ('/user',userRoutes)

//req cons
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});