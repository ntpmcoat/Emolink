// models/UserActivityDuration.js
import mongoose from 'mongoose';

const userActivityDurationSchema = new mongoose.Schema({
  username: String,
  activityTimestamp: { type: Date, default: Date.now },
  durationInSeconds: Number,
  dayOfWeek: Number, 
});

const UserActivityDuration = mongoose.model('UserActivityDuration', userActivityDurationSchema);

export default UserActivityDuration;