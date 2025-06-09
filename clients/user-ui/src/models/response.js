import mongoose, {Schema} from "mongoose";

const calSchema = new Schema(
    {
        title: String,
        name: String,
        date: Date,
        id: Number,
        idIssue: Number,
        solution: String,
    },
    {
        timestamps: true,
    }
);

const Response = mongoose.models.Response || mongoose.model("Response", calSchema)

export default Response;