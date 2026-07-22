import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    hashtags: { type: [String], required: true },
    VideoURL:{type:String}
});

const Video = mongoose.model('content',videoSchema);

export default Video;