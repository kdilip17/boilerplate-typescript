'use strict';

import * as express from 'express';
import {healthController} from '../controllers/health';

const healthCtrl = new healthController();

const router = express.Router();

router.get('/', healthCtrl.healthCheck);
router.post('/test', healthCtrl.testJoi);

export = router;
