import express from 'express'
import { createFromUser as bankAccountManagerFor } from './models/BankAccountManager'
import backaccountRouter from './routes/bankaccount/handler'
import exchangeRouter from './routes/exchange/handler'
import cryptoaccountRouter from './routes/cryptoaccount/handler'
import testRouter from './routes/test/handler'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import createError from 'http-errors'
import { ErrorRequestHandler } from 'express-serve-static-core';
import cors from 'cors'


const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const whitelist = [
    'http://localhost:3000',
    'https://thawing-badlands-89809.herokuapp.com',
];
const corsOptions = {
    'origin': function (origin: any, callback: any) {        
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors())

app.use('/exchange', exchangeRouter)
app.use('/cryptoaccount', cryptoaccountRouter)
app.use('/bankaccount', backaccountRouter)
app.use('/test', testRouter);

app.use((req, res, next) => {
    next(createError(404));
});

const requestHandler: ErrorRequestHandler = (err, req, res, next) => {
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.sendStatus(200);
    }
    else {
        //move on
        next();
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}
app.use(requestHandler);
const server = app.listen(8080);

process.on('uncaughtException', () => server.close())
process.on('SIGTERM', () => server.close())
process.on('exit', () => server.close())
