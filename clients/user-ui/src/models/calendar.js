import mongoose, {Schema} from "mongoose";

const calSchema = new Schema(
    {
        title: String,
        start: Date,
        end: Date,
        allDay: Boolean,
        id: Number,
        info: String,
        surveyEvent: String,
    },
    {
        timestamps: true,
    }
);

const Calendar = mongoose.models.Calendar || mongoose.model("Calendar", calSchema)

export default Calendar;