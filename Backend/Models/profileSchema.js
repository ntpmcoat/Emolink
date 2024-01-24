import Register from "./User";

const profileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Register,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: '',
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    posts: {
      type: Number,
      default: 0,
    },
    userImage: {
      type: Buffer,
    },
    // Add other fields as needed for the user profile
  });
  
  const Profile = mongoose.model('Profile', profileSchema);

export default Profile  ;