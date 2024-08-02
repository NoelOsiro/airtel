import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  const supabase = createClient();
    const { data: routers, error } = await supabase.from('routers').select('*');
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(routers);
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
    const body = await req.json();
    const { data, error: insertError } = await supabase.from('routers').insert(body);
    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}
