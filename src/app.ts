import express, { Request, Response } from 'express'
const app = express();
import ('./todo/todoController');
import path from 'path';

app.set('view engine','ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req : Request, res : Response)=>{
    res.render('home.ejs');
})

export default app;