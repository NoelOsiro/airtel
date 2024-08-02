import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  const supabase = createClient();
    const { data: staff, error } = await supabase.from('staff').select('*');
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(staff);
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
    const body = await req.json();
    const { data, error: insertError } = await supabase.from('staff').insert(body);
    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}
