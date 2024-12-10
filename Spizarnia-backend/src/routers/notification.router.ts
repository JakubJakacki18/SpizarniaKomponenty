import { Router } from 'express';
import { subscribe, sendNotification } from '../controllers/notification.controller';

const router = Router();

router.post('/subscribe', subscribe);
router.post('/sendNotification', sendNotification);

export default router;
