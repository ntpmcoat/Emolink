import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const tokenSchema=new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"RegisteredUser",
        unique:true,
    },
    email:{
        type:String,
        require:true,
    },
    token:{
        type:String,
        require:true
    },
    createdAt:{type:Date,default:Date.now(),expires:600}
})

const Token=mongoose.model('token',tokenSchema);
export default Token;