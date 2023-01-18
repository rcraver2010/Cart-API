import express, { application, request, response} from 'express';
import { itemRouter } from './route';

const app:Application = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.us("/items", itemRouter);

app.listen(port, ():void => {
    console.log(`Listening on port ${port}`);
});