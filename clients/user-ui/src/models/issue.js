import mongoose, {Schema} from "mongoose";

const calSchema = new Schema(
    {
        title: String,
        name: String,
        date: Date,
        id: Number,
        situation: String,
        surveyEvent: String,
    },
    {
        timestamps: true,
    }
);

const Issue = mongoose.models.Issue || mongoose.model("Issue", calSchema)

export default Issue;