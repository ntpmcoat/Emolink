import Message from "../Models/Message.js";
import Register from "../Models/User.js";
import Chat from "../Models/chatModel.js";


export const sendMessage=async(req,res)=>{
    const {content,chatId}=req.body;
    if( !content || !chatId){
        console.log("Invalid data passed")
        return res.sendStatus(400);
    }
    var newMessage=new Message({
        sender:req.user._id,
        content:content,
        chatId:chatId
    });

    try {
        var message=await Message.create(newMessage);
        message=await message.populate("sender","name");
        message=await message.populate("chat");
        message=await Register.populate(message,{
            path:"chat.users",
            select:"name email",
        });
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        });
        res.json(message)
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}

export const allMessages=async(req,res)=>{
    try {
        const id=(req.params.chatId);
        const messages = await Message.find({ chatId: id }).populate('sender', 'name email').populate('chat');
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }     
}