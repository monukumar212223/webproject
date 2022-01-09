const mongoose=require('mongoose');

const likesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment']
    }
},{timestamps: true
});

const Like=mongoose.model('Like',likesSchema);

module.exports=Like;

