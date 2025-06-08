import { NextResponse } from "next/server";
import Calendar from "../../../../models/calendar";
import connectMongoDB from "../../../libs/mongodb";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newTitle: title, newStart: start, newEnd: end, newAllDay: allDay, newInfo: info, newEveId:eveId} = await request.json();
    await connectMongoDB();
    await Calendar.findByIdAndUpdate(id, {title, start, end, allDay, info, eveId});
    return NextResponse.json({message: "Calendar updated"}, {status: 200})
}

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const calendar = await Calendar.findOne({_id: id});
    return NextResponse.json({calendar}, {status: 200});
}