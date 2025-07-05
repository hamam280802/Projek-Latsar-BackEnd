import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '../../../actions/register-user';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await registerUser(body);
  return NextResponse.json(user);
}
