import express, { Express, Response, Request } from 'express';
import adminrouter from './admin.routes';
import authrouter from './auth.routes';
import { mainrouter } from './main.routes';
import paymentrouter from './payment.routes';
export const router = express.Router();



router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//api/
router.use('/user', authrouter);
router.use('/main', mainrouter);
router.use('/payment', paymentrouter);
router.use('/admin', adminrouter);

export default router;