'use strict';

import { formatRequest, checkRequest } from '../utils/utils';
import {testJoi} from '../schema/test';


export class healthController {
    healthCheck = (req, res, next) => {
        try {
            res.send("success here")
        } catch (err) {
            next(err); // force app error in browser
        }
    };

    testJoi = async function(req, res, next){
        try {
            req = formatRequest(req);
            // fetch the request data
            const data = req.payload;
           
            // 
            let validateResult = await checkRequest(data,testJoi);
            if(validateResult['status'] != 'valid'){
                res.status(422).json(validateResult)
            }else{
                const id = Math.ceil(Math.random() * 9999999);
                res.json({
                    status: 'success',
                    message: 'User created successfully',
                    data: Object.assign({id}, validateResult['data'])
                });
            }
        } catch (err) {
          return next(err)
        }
      }
}


