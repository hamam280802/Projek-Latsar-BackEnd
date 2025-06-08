import { NextResponse } from "next/server";
import Calendar from "../../../models/calendar";
import connectMongoDB from "../../libs/mongodb";

export async function POST(request) {
  const { title, start, end, allDay, info, surveyEvent, id } = await request.json();
  await connectMongoDB();
  await Calendar.create({ title, start, end, allDay, info, surveyEvent, id });
  return NextResponse.json({ message: "Calendar created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const cals = await Calendar.find({});
  return NextResponse.json({ cals });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Calendar.findByIdAndDelete(id);
  return NextResponse.json({ message: "Calendar deleted" }, { status: 200 });
}
