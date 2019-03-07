'use strict';

import * as Joi from "joi";

const testJoi =  Joi.object().keys({
    // email is required
    // email must be a valid email string
    email: Joi.string().email().required(),
    // phone is required
    // and must be a string of the format XXX-XXX-XXXX
    // where X is a digit (0-9)
    phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required()

});

export {
    testJoi
};

