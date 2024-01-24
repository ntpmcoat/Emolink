// models/Message.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chatName:{type:String,trim:true},
  isGroupChat:{type:Boolean,default:false},
  users:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RegisteredUser",
  }],
  latestMessage:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RegisteredUser",
  },
  groudAdmin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RegisteredUser",
  },
  
},
{
  timestamps:true
}

);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
