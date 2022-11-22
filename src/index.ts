import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { usuarioRoute } from './routes/usuarioRoute';
import cors from 'cors';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(cors({
        origin(origin, callback){
            callback(null, true)
        }
    }));

    app.use(express.json());

    app.use(usuarioRoute);

    return app.listen(process.env.PORT);
});
