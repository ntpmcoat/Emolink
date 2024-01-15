import mongoose from "mongoose";
const friendRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisteredUser", // Reference to the User model
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisteredUser", // Reference to the User model
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  },
});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequest;
