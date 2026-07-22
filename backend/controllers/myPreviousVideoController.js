import Failed from "../models/failedSchema.js";
import Video from "../models/videoSchema.js";

const myVideo = async (req, res) => {
    try {
        const videos = await Video.find({ userID: req.user.id });

        if (videos.length == 0) {
            return res.status(200).json({ message: "You Have not generated any Video",videos});
        }

        res.status(200).json({message:"Generated Video",videos});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const processVideo = async(req, res)=>{
    try {
        const check = await Failed.findOne({userID:req.user.id});

        if(!check){
           return res.status(200).json({success:true,message:"No Process Pending"});
        };

        res.status(200).json({success:false,message:"Process Pending"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error",error});
    }
}

export {myVideo, processVideo};