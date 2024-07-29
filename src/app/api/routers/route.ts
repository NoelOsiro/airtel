import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';




export async function GET(req: NextRequest) {
    const supabase = createClient();
  try {
    const { data, error } = await supabase.from('Routers').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}