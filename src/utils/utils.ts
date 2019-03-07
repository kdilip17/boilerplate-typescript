'use strict';

import * as Joi from "joi";

let formatRequest =  (req => {
    req.headers["origin"] = "*";
    const newReq = {
        params : req.params ? req.params : {},
        query  : req.query ? req.query : {},
        payload: req.body ? req.body : {},
        auth   : req.auth ? req.auth.credentials : {},
        info   : req.info ? req.info : {},
        headers: req.headers ? req.headers : {},
        meta   : {
            id          : req.id ? req.id : Math.ceil(Math.random() * 9999999)
        }
    };
    return newReq;
});

let checkRequest =  ((data,schema) => {
    return new Promise(resolve => {
        Joi.validate(data, schema, (err, value) => {
            if(!err){
                resolve({
                    status : 'valid',
                    data   : value
                });
            }else{
                resolve({
                    status: 'error',
                    message: 'Invalid request data',
                    data: data
                })
            }
        });
    });
});

export {
    formatRequest,checkRequest
};
