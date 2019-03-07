'use strict';

import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

// route references
import * as healthRoutes from './routes/health';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, '../public'),
    dest: path.join(__dirname, '../public'),
    indentedSyntax: false,
    sourceMap: true
}));

//
// connect to database and register models
///////////////////////////////////////////////////////////
import { conn } from './models';

//
// serve static files
///////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, '../public')));

// moved logger here to log next requests
app.use(logger('dev'));

//
// serve API V1 routes
///////////////////////////////////////////////////////////
// app.use('/apiv1/products', require('./routes/apiv1/products').router);
// app.use('/apiv1/users',    require('./routes/apiv1/users').router);

//
// serve Web routes
///////////////////////////////////////////////////////////

app.use('/', healthRoutes);
// app.use('/products',        require('./routes/products'));

// catch not handled and return 404
app.use((req, res, next) => next({
    message: 'Not Found',
    status: 404,
    stack: (new Error()).stack
}));

//
// error handlers (dev / prod)
///////////////////////////////////////////////////////////

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        if (isApi(req)) {
            res.json({success: false, error: err});
        } else {
            res.render('error', {message: err.message, error: err});
        }
    });
}

// production error handler - no stack-traces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (isApi(req)) {
        res.json({success: false, error: err});
    } else {
        res.render('error', {message: err.message, error: {}});
    }
});

function isApi(req) {
    return req.url.indexOf('/apiv1/') === 0;
}

export = app;
