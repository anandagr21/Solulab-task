import express from 'express'
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit'
import userRoutes from './routes/userRoutes.js';
import cabRoutes from './routes/cabRoutes.js';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((err) => {
        console.log(`DB CONNECTION ERROR: ${err}`);
    });

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// routes
app.use('/api/users', userRoutes);
app.use('/api/bookcab', cabRoutes);

app.use(notFound);
app.use(errorHandler);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode at ${port}`));
