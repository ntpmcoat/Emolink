import Register from "../Models/User.js";
import Chat from "../Models/chatModel.js";

export const accessChat=async(req,res)=>{
    const {userId}= req.body;
    if(!userId){
        console.log("userId param not sent with request");
        return res.status(400);
    }

    var isChat=await Chat.find({
        isGroupChat: false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ],
}).populate("users","-password").populate("latestMessage");
isChat=await Register.populate(isChat,{
    path:"latestMessage.sender",
    select:"name email",
});

if(isChat.length>0){
    res.send(isChat[0]);
}else{
    var charData={
        chatName:"sender",
        isGroupChat:false,
        users:[req.user._id,userId],
    };

    try {
        const createdChat=await Chat.create(charData);

        const FullChat=await Chat.findOne({_id:createdChat._id}).populate("users","-password");

        res.status(200).send(FullChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}
}

export const fetchChats=async(req,res)=>{
    try {
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt:-1})
        .then(async(results)=>{
            results=await Register.populate(results,{
                path:"latestMessage.sender",
                select:"name email",
            });
            res.status(200).send(results);
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}


export const createGroupChat=async(req,res)=>{
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all fields" });
    }    
    var users=JSON.parse(req.body.users);
    if(users.length>2){
        return res.status(400).send("More than 2 users are required to form a group chat");
    }

    users.push(req.user); 

    try {
        const groupChat=new Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groudAdmin:req.user,
        });

        const fullGroupChat=await Chat.findOne({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password");
        res.status(200).send(fullGroupChat);


    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}


export const renameGroup=async(req,res)=>{
    const {chatId,chatName}=req.body;
    const updateChat=await Chat.findByIdAndUpdate(
        chatId,{chatName},{new:true,}
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!updateChat){
        res.status(404);
        throw new Error("Chat Not Found");
    }else{
        res.json(updateChat);
    }
}

export const addToGroup=async(req,res)=>{
    const {chatId,userId}=req.body;
    const added=await Chat.findByIdAndUpdate(
        chatId,{$push:{users:userId}},{new:true,}
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!added){
        res.status(404);
        throw new Error("Chat Not Found");
    }else{
        res.json(added);
    }
}

export const removeFromGroup=async(req,res)=>{
    const {chatId,userId}=req.body;
    const removed=await Chat.findByIdAndUpdate(
        chatId,{$pull:{users:userId}},{new:true,}
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!removed){
        res.status(404);
        throw new Error("Chat Not Found");
    }else{
        res.json(removed);
    }
}