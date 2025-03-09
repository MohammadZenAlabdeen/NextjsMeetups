import mongoose from "mongoose";

const MeetupSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    img_url:{
        type:String,
        required:true
    },
})
const Meetup=mongoose.models.Meetup||mongoose.model('Meetup',MeetupSchema);

export default Meetup;