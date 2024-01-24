import express from 'express'
const analyticsRouter = express.Router();
import { track,getTrack} from '../controllers/analytics.js';

analyticsRouter.post('/userActivity',track);
analyticsRouter.get('/userActivityDuration/:username',getTrack);

export default analyticsRouter;