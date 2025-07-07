import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '../../../actions/register-user';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await registerUser(body);
  return NextResponse.json(result);
}
