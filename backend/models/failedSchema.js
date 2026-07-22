import mongoose from "mongoose";

const failedSchema = new mongoose.Schema({

    userID: { type: mongoose.Schema.Types.ObjectId, ref: "auth", required: true },
    audio: { type: String, required: true },
    scenes: [{ scene: { type: String }, query: { type: String } }],
    script: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    hashtags: { type: [String], default: [] },
    sceneGenerated: { type: Boolean, default: false },
    clipGenerated: { type: Boolean, default: false },
    videoGenerated: { type: Boolean, default: false },
    processing: { type: Boolean, default: false },
    retryCount: { type: Number, default: 0 },
    baseURL: { type: String, required: true }
}, {
    timestamps: true
});

const Failed = mongoose.model("failed", failedSchema);

export default Failed;