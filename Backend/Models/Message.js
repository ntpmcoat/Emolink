import mongoose from "mongoose";

const messageModel=mongoose.Schema({
    chatId:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"RegisteredUser"},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"}
},
{
    timestamps:true
}
);
const Message=mongoose.model("Message",messageModel);
export default Message;